package back.ailion.exception.custom;

import back.ailion.exception.BaseExceptionCode;
import lombok.Getter;

@Getter
public class FileException extends RuntimeException{

    private final BaseExceptionCode baseExceptionCode;

    public FileException(BaseExceptionCode baseExceptionCode) {
        this.baseExceptionCode = baseExceptionCode;
    }
}