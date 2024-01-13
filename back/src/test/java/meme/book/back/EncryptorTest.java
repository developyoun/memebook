package meme.book.back;

import meme.book.back.config.EncryptConfig;
import org.jasypt.encryption.StringEncryptor;
import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;

@SpringBootTest
public class EncryptorTest {

    @Autowired
    private EncryptConfig encryptConfig;

    @Test
    void encryptTest() {
        StringEncryptor encryptor = encryptConfig.jasyptEncryptor();
        System.out.println(encryptor.decrypt("HZSF5UjiWuyTmPgUcfGf01H9EZ7l4lKi"));
        System.out.println(encryptor.decrypt("VvsJNkYIify/HqVOCIBRXlq12D6ehHPa"));
    }
}
