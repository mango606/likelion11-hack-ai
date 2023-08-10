package back.ailion.exception;

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
}
