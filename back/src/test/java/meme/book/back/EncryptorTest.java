package meme.book.back;

import meme.book.back.config.EncryptConfig;
import org.jasypt.encryption.StringEncryptor;
import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class EncryptorTest {

    @Autowired
    private EncryptConfig encryptConfig;

    @Test
    void encryptTest() {
        StringEncryptor encryptor = encryptConfig.jasyptEncryptor();
    }
}
