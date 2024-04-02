package meme.book.back.repository.wordContent;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class WordContentRepositoryImpl implements WordContentCustomRepository {

    private final JPAQueryFactory queryFactory;


}