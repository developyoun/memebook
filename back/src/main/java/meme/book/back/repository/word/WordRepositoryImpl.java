package meme.book.back.repository.word;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class WordRepositoryImpl implements WordCustomRepository {

    private final JPAQueryFactory queryFactory;
}
