package meme.book.back;

import meme.book.back.config.EncryptConfig;
import org.jasypt.encryption.StringEncryptor;
import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
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
        System.out.println(e.encrypt("jdbc:mysql://localhost:3306/memebook?characterEncoding=UTF-8&serverTimezone=Asia/Seoul"));
        System.out.println(e.encrypt("MEMEBOOK"));
        System.out.println(e.encrypt("memeBook!@3"));

    }
}
