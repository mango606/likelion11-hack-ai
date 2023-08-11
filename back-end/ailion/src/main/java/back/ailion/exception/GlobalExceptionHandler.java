package back.ailion.exception;

import back.ailion.exception.custom.AlreadyExecutedException;
import back.ailion.exception.custom.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BaseException.class)
    public ResponseEntity<ExceptionResponse> baseExceptionHandler(BaseException e) {
        return ResponseEntity
                .status(e.getBaseExceptionCode().getHttpStatusCode())
                .body(new ExceptionResponse(e.getBaseExceptionCode().getHttpStatusCode(), e.getBaseExceptionCode().getMessage()));
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ExceptionResponse> notFoundExceptionHandler(NotFoundException e) {
        return ResponseEntity
                .status(e.getBaseExceptionCode().getHttpStatusCode())
                .body(new ExceptionResponse(e.getBaseExceptionCode().getHttpStatusCode(), e.getBaseExceptionCode().getMessage()));
    }

    @ExceptionHandler(AlreadyExecutedException.class)
    public ResponseEntity<ExceptionResponse> alreadyExecutedExceptionHandler(AlreadyExecutedException e) {
        return ResponseEntity
                .status(e.getBaseExceptionCode().getHttpStatusCode())
                .body(new ExceptionResponse(e.getBaseExceptionCode().getHttpStatusCode(), e.getBaseExceptionCode().getMessage()));
    }


}
