package meme.book.back.repository;

import org.springframework.stereotype.Repository;

@Repository
public interface TestInterface {

    default void test() {
        System.out.println("인터페이스 구현이요");
    }
}
