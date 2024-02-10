package meme.book.back.dto;

import lombok.Data;
import lombok.experimental.Accessors;
import meme.book.back.utils.ErrorCode;
import org.springframework.http.HttpStatus;

/**
 * Response 공통 DTO
 */
@Data
@Accessors(chain = true)
public class ResponseDto {

    private HttpStatus status = HttpStatus.OK;

    private String message = "Success";

    private Object data;

    public static ResponseDto of() {
        return new ResponseDto();
    }

    public static ResponseDto of(Object data) {
        return new ResponseDto()
                .setData(data);
    }

    public static ResponseDto of(HttpStatus status, String message, Object data) {
        return new ResponseDto()
                .setStatus(status)
                .setMessage(message)
                .setData(data);
    }

    public static ResponseDto error(ErrorCode errorCode) {
        return new ResponseDto()
                .setStatus(errorCode.getStatus())
                .setMessage(errorCode.getMessage())
                .setData(null);
    }

}
