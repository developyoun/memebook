package meme.book.back.repository.scrap;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import meme.book.back.dto.ScrapResponseDto;
import meme.book.back.entity.QMember;
import meme.book.back.entity.QScrap;
import meme.book.back.entity.QWord;

import java.util.List;

@RequiredArgsConstructor
public class ScrapCustomRepositoryImpl implements ScrapCustomRepository{

    private final JPAQueryFactory queryFactory;

    @Override
    public List<ScrapResponseDto> getScrapListByMemberIdx(Long memberIdx) {
        QScrap scrap = QScrap.scrap;
        QWord word = QWord.word;
        QMember member = QMember.member;

        return queryFactory.select(
                        Projections.fields(ScrapResponseDto.class,
                                scrap.scrapIdx.as("scrapIdx"),
                                scrap.memberIdx.as("memberIdx"),
                                scrap.wordIdx.as("wordIdx"),
                                scrap.regDtm.as("regDtm"),
                                word.wordTitle.as("wordTitle"),
                                word.wordContent.as("wordContent"),
                                member.nickname.as("nickname")
                        )
                )
                .from(scrap)
                .innerJoin(word).on(scrap.wordIdx.eq(word.wordIdx))
                .innerJoin(member).on(scrap.memberIdx.eq(member.memberIdx))
                .where(scrap.memberIdx.eq(memberIdx))
                .fetch();
    }

}
