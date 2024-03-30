package meme.book.back.repository.like;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class LikeRepositoryImpl implements LikeCustomRepository {

    private final JPAQueryFactory queryFactory;


}
