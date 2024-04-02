package meme.book.back.repository.word;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import meme.book.back.dto.WordListRequestDto;
import meme.book.back.dto.WordListResponseDto;
import meme.book.back.utils.NationCode;
import meme.book.back.utils.SortType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.List;

import static meme.book.back.entity.QWord.word;
import static meme.book.back.entity.QWordContent.wordContent;

@RequiredArgsConstructor
public class WordRepositoryImpl implements WordCustomRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<WordListResponseDto> getAllWordList(Pageable pageable, WordListRequestDto dto) {

        List<WordListResponseDto> fetch = queryFactory.select(
                        Projections.fields(WordListResponseDto.class,
                                word.wordIdx.as("wordIdx"),
                                wordContent.content.as("wordContent"),
                                word.wordNation.as("wordNation"),
                                word.wordName.as("wordName"),
                                word.wordLike.as("likeCount"),
                                word.wordDislike.as("dislikeCount"),
                                wordContent.memberIdx.as("memberIdx"),
                                wordContent.regDtm.as("regMem"),
                                wordContent.modDtm.as("modDtm")
                        )
                )
                .from(word)
                .leftJoin(wordContent).on(word.wordIdx.eq(wordContent.wordIdx))
                .where(
                        nationEq(dto.getNationCode()),
                        titleEq(dto.getSearch())
                )
                .orderBy(dynamicSort(dto.getSort(), dto.getSortBy()))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> count = queryFactory.select(word.count())
                .from(word)
                .where(nationEq(dto.getNationCode()), titleEq(dto.getSearch()));

        return PageableExecutionUtils.getPage(fetch, pageable, count::fetchOne);
    }

    private BooleanExpression nationEq(NationCode nationCode) {
        return !nationCode.equals(NationCode.ALL) ? word.wordNation.eq(nationCode) : null;
    }

    private BooleanExpression titleEq(String search) {
        return search != null ? word.wordName.contains(search) : null;
    }

    private OrderSpecifier<?> dynamicSort(SortType sort, String sortBy) {
        Order order = (sortBy == null || sortBy.equals("desc")) ? Order.DESC : Order.ASC;

        if (sort == null) {
            return new OrderSpecifier<>(order, word.wordIdx);
        }

        return switch (sort) {
            case LIKE -> new OrderSpecifier<>(order, word.wordLike);
            case DISLIKE -> new OrderSpecifier<>(order, word.wordDislike);
            default -> new OrderSpecifier<>(order, word.wordIdx);
        };
    }
}
