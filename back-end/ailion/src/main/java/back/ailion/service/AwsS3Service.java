package back.ailion.service;

import back.ailion.exception.BaseExceptionCode;
import back.ailion.exception.custom.FileException;
import back.ailion.exception.custom.NotFoundException;
import back.ailion.model.dto.DownloadDto;
import back.ailion.model.dto.FileUploadResponse;
import back.ailion.model.dto.request.FileUploadRequest;
import back.ailion.model.entity.FileUpload;
import back.ailion.model.entity.Image;
import back.ailion.model.entity.Post;
import back.ailion.repository.ImageRepository;
import back.ailion.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriUtils;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AwsS3Service {

    private final S3CommonUtils commonUtils;
    private final PostRepository postRepository;
    private final ImageRepository imageRepository;


    public FileUploadResponse uploadFile(FileUploadRequest fileUploadRequest) throws IOException {

        Post post = postRepository.findById(fileUploadRequest.getPostId())
                .orElseThrow(() -> new NotFoundException(BaseExceptionCode.POST_NOT_FOUND));

        // 파일이 들어있는지 확인하는 메서드
        validateFileExists(fileUploadRequest.getAttachFile());
        validateFilesExists(fileUploadRequest.getImageFiles());

        // MultipartFile을 FileUpload로 변환
        FileUpload attachFile = commonUtils.convertFile(fileUploadRequest.getAttachFile());
        List<FileUpload> storeImageFiles = commonUtils.convertFiles(fileUploadRequest.getImageFiles());

        Image image = Image.builder()
                .post(post)
                .attachFile(attachFile)
                .imageFiles(storeImageFiles)
                .build();

        imageRepository.save(image);

        List<String> fileUrls = commonUtils.storeFiles(fileUploadRequest.getImageFiles());

        MultipartFile multipartFile = fileUploadRequest.getAttachFile();
        String storeFileName = attachFile.getStoreFileName();

        return new FileUploadResponse(commonUtils.storeFile(multipartFile, storeFileName), fileUrls);
    }

    public DownloadDto downloadImageFile(String filename) throws MalformedURLException {

        UrlResource resource = new UrlResource(commonUtils.getFullPath(filename));

        String encodedUploadFileName = UriUtils.encode(filename, StandardCharsets.UTF_8);
        String contentDisposition = "image; filename=\"" + encodedUploadFileName + "\"";

        return new DownloadDto(contentDisposition, resource);
    }

    public DownloadDto downloadAttachFile(Long imageId) throws MalformedURLException {
        Image image = imageRepository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("Could not found image id "));

        String storeFileName = image.getAttachFile().getStoreFileName();
        String uploadFileName = image.getAttachFile().getUploadFileName();

        UrlResource resource = new UrlResource(commonUtils.getFullPath(storeFileName));

        String encodedUploadFileName = UriUtils.encode(uploadFileName, StandardCharsets.UTF_8);
        String contentDisposition = "attachment; filename=\"" + encodedUploadFileName + "\"";

        return new DownloadDto(contentDisposition, resource);
    }


    public void validateFileExists(MultipartFile multipartFile) {

        // 업로드된 파일이 없는 경우
        if (multipartFile == null) {
            throw new FileException(BaseExceptionCode.MissingFileException);
        }

        // 업로드된 파일이 비어 있는 경우
        if (multipartFile.isEmpty()) {
            throw new FileException(BaseExceptionCode.EmptyFileException);
        }
    }

    public void validateFilesExists(List<MultipartFile> multipartFiles) {

        for (MultipartFile multipartFile : multipartFiles) {
            validateFileExists(multipartFile);
        }
    }
}
