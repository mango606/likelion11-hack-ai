package back.ailion.model.entity;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class FileUpload {
    private String uploadFileName;
    private String storeFileName;

    public FileUpload(String uploadFileName, String storeFileName) {
        this.uploadFileName = uploadFileName;
        this.storeFileName = storeFileName;
    }
}
