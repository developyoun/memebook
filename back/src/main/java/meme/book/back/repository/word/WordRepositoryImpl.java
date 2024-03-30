package meme.book.back.repository.word;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import meme.book.back.entity.QReaction;
import meme.book.back.entity.QWord;
import meme.book.back.entity.Reaction;
import meme.book.back.utils.ActionType;

import java.util.List;

@RequiredArgsConstructor
public class WordRepositoryImpl implements WordCustomRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Tuple> getAllWordList(long page, long pageSize) {
        QWord word = QWord.word;
        QReaction reaction = QReaction.reaction;

        return queryFactory.select(
                        word.wordIdx,
                        word.wordContent,
                        reaction.count()
                )
                .from(word)
                .leftJoin(reaction).on(word.wordIdx.eq(reaction.wordIdx)
                        .and(reaction.reactionType.eq(ActionType.LIKE)))
                .leftJoin(reaction).on(word.wordIdx.eq(reaction.wordIdx)
                        .and(reaction.reactionType.eq(ActionType.DISLIKE)))
                .groupBy(word.wordIdx)
                .offset(page * pageSize)
                .limit(pageSize)
                .fetch()
                ;
    }
}
