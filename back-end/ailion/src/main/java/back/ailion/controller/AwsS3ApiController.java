package back.ailion.controller;

import back.ailion.model.dto.FileUploadResponse;
import back.ailion.model.dto.request.FileUploadRequest;
import back.ailion.service.AwsS3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/files")
@RequiredArgsConstructor
public class AwsS3ApiController {

    private final AwsS3Service awsS3Service;

    @PostMapping("/upload")
    public FileUploadResponse uploadFile(@RequestParam("postId") Long postId,
                                         @RequestPart(value = "attachFile") MultipartFile attachFile,
                                         @RequestPart(value = "imageFiles") List<MultipartFile> imageFiles) throws IOException {

        FileUploadRequest fileUploadRequest = new FileUploadRequest(postId, attachFile, imageFiles);
        return awsS3Service.uploadFile(fileUploadRequest);
    }


}
