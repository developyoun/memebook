package meme.book.back.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = -363649339L;

    public static final QMember member = new QMember("member1");

    public final StringPath imgUrl = createString("imgUrl");

    public final StringPath memberId = createString("memberId");

    public final NumberPath<Long> memberIdx = createNumber("memberIdx", Long.class);

    public final StringPath memberPw = createString("memberPw");

    public final DateTimePath<java.time.LocalDateTime> memberRegDtm = createDateTime("memberRegDtm", java.time.LocalDateTime.class);

    public final StringPath nickname = createString("nickname");

    public final EnumPath<meme.book.back.utils.NationCode> originNation = createEnum("originNation", meme.book.back.utils.NationCode.class);

    public final EnumPath<meme.book.back.utils.NationCode> targetNation = createEnum("targetNation", meme.book.back.utils.NationCode.class);

    public QMember(String variable) {
        super(Member.class, forVariable(variable));
    }

    public QMember(Path<? extends Member> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMember(PathMetadata metadata) {
        super(Member.class, metadata);
    }

}

