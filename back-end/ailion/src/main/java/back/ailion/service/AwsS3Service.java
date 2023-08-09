package back.ailion.service;

import back.ailion.model.dto.FileUploadResponse;
import back.ailion.model.dto.request.FileUploadRequest;
import back.ailion.model.entity.FileUpload;
import back.ailion.model.entity.Image;
import back.ailion.model.entity.Post;
import back.ailion.repository.ImageRepository;
import back.ailion.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AwsS3Service {

    private final S3CommonUtils commonUtils;
    private final PostRepository postRepository;
    private final ImageRepository imageRepository;


    public FileUploadResponse uploadFile(FileUploadRequest fileUploadRequest) throws IOException {

        Post post = postRepository.findById(fileUploadRequest.getPostId())
                .orElseThrow(() -> new RuntimeException("no id" + fileUploadRequest.getPostId()));

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
}
