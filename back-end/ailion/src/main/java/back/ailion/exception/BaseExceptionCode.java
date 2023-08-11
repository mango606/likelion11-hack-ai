package back.ailion.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum BaseExceptionCode {
    // 400 BAD REQUEST
    BAD_REQUEST(HttpStatus.BAD_REQUEST.value(), "잘못된 요청입니다."),
    AUTHORIZATION_HEADER_NULL(HttpStatus.BAD_REQUEST.value(), "인증 헤더가 null입니다."),

    // 403 FORBIDDEN
    NOT_YOUR_POST(HttpStatus.FORBIDDEN.value(), "작성자가 아닙니다."),

    // 409 CONFLICT
    USER_ID_CONFLICT(HttpStatus.CONFLICT.value(), "아이디가 중복입니다."),

    // 404 NOT FOUND
    USER_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "아이디가 존재하지 않습니다."),

    POST_NOT_FOUND(404,  "게시글이 존재하지 없습니다."),

    COMMENT_NOT_FOUND(404,  "댓글이 존재하지 없습니다."),

    REPLY_NOT_FOUND(404,  "대댓글이 존재하지 없습니다.");


    private final int httpStatusCode;
    private final String message;

    BaseExceptionCode(int httpStatusCode, String message) {
        this.httpStatusCode = httpStatusCode;
        this.message = message;
    }

}
