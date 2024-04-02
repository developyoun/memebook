package meme.book.back.repository.scrap;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import meme.book.back.dto.ScrapResponseDto;

import java.util.List;

import static meme.book.back.entity.QMember.member;
import static meme.book.back.entity.QScrap.scrap;
import static meme.book.back.entity.QWord.word;
import static meme.book.back.entity.QWordContent.wordContent;

@RequiredArgsConstructor
public class ScrapCustomRepositoryImpl implements ScrapCustomRepository{

    private final JPAQueryFactory queryFactory;

    @Override
    public List<ScrapResponseDto> getScrapListByMemberIdx(Long memberIdx) {

        return queryFactory.select(
                        Projections.fields(ScrapResponseDto.class,
                                scrap.scrapIdx.as("scrapIdx"),
                                scrap.memberIdx.as("memberIdx"),
                                scrap.wordIdx.as("wordIdx"),
                                scrap.regDtm.as("regDtm"),
                                word.wordName.as("wordTitle"),
                                wordContent.content.as("wordContent"),
                                member.nickname.as("nickname")
                        )
                )
                .from(scrap)
                .innerJoin(word).on(scrap.wordIdx.eq(word.wordIdx))
                .innerJoin(wordContent).on(scrap.wordIdx.eq(wordContent.wordIdx))
                .innerJoin(member).on(scrap.memberIdx.eq(member.memberIdx))
                .where(scrap.memberIdx.eq(memberIdx))
                .fetch();
    }

}
