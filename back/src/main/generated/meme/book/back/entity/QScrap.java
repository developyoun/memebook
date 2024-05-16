package meme.book.back.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QScrap is a Querydsl query type for Scrap
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QScrap extends EntityPathBase<Scrap> {

    private static final long serialVersionUID = 547945030L;

    public static final QScrap scrap = new QScrap("scrap");

    public final NumberPath<Long> memberIdx = createNumber("memberIdx", Long.class);

    public final DateTimePath<java.time.LocalDateTime> regDtm = createDateTime("regDtm", java.time.LocalDateTime.class);

    public final NumberPath<Long> scrapIdx = createNumber("scrapIdx", Long.class);

    public final NumberPath<Long> wordIdx = createNumber("wordIdx", Long.class);

    public QScrap(String variable) {
        super(Scrap.class, forVariable(variable));
    }

    public QScrap(Path<? extends Scrap> path) {
        super(path.getType(), path.getMetadata());
    }

    public QScrap(PathMetadata metadata) {
        super(Scrap.class, metadata);
    }

}

