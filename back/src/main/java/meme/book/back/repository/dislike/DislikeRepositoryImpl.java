package meme.book.back.repository.dislike;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class DislikeRepositoryImpl implements DislikeCustomRepository {

    private final JPAQueryFactory queryFactory;


}
