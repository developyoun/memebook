package meme.book.back.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Slf4j
@Configuration
public class SwaggerConfig {

    @Value(value = "${springdoc.domain.url}")
    private String domain;

//    @Bean
//    public OpenAPI openAPI() {
//
//        Server server = new Server();
//        server.setUrl(domain);
//
//        return new OpenAPI()
//                .components(new Components())
//                .info(apiInfo())
//                .servers(List.of(server));
//    }

    private Info apiInfo() {
        return new Info()
                .title("MEME BOOK api 문서")
                .description("API 문서를 관리하기 위한 규격서")
                .version("1.0.0");
    }
}
