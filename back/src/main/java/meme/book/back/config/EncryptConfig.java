package meme.book.back.config;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;
import org.jasypt.encryption.StringEncryptor;
import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableEncryptableProperties
public class EncryptConfig {

    @Value("${jasypt.encryptor.password}")
    private String encryptKey;

    // 암호화 설정
    @Bean("jasyptStringEncryptor")
    public StringEncryptor jasyptEncryptor() {
        PooledPBEStringEncryptor encryptor = new PooledPBEStringEncryptor();
        encryptor.setAlgorithm("PBEWithMD5AndDES");
        encryptor.setPoolSize(2);
        encryptor.setStringOutputType("base64");
        encryptor.setKeyObtentionIterations(1000);
        encryptor.setPassword(encryptKey);

        return encryptor;
    }

}
