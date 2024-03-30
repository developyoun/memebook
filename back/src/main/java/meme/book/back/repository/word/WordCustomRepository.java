package meme.book.back.repository.word;

import com.querydsl.core.Tuple;

import java.util.List;

public interface WordCustomRepository {

    List<Tuple> getAllWordList(long page, long pageSize);
}
