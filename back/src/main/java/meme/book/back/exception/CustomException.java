package meme.book.back.exception;

import meme.book.back.utils.ErrorCode;
import org.springframework.http.HttpStatus;

public class CustomException extends RuntimeException{

    private HttpStatus statusCode;
    private String message;

    public CustomException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.statusCode = errorCode.getStatus();
        this.message = errorCode.getMessage();
    }

}
