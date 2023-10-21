package meme.book.back;

import meme.book.back.config.EncryptConfig;
import org.jasypt.encryption.StringEncryptor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class EncryptTest {

    @Autowired
    EncryptConfig encryptConfig;

    @Test
    public void encryptTest() {
        StringEncryptor e = encryptConfig.jasyptEncryptor();

    }
}
