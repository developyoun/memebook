package meme.book.back.repository.scrap;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
public class ScrapRepositoryImpl implements ScrapCustomRepository{

    private final JPAQueryFactory queryFactory;
}
