package meme.book.back.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QWordContent is a Querydsl query type for WordContent
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QWordContent extends EntityPathBase<WordContent> {

    private static final long serialVersionUID = -984142652L;

    public static final QWordContent wordContent = new QWordContent("wordContent");

    public final StringPath content = createString("content");

    public final NumberPath<Long> contentDislike = createNumber("contentDislike", Long.class);

    public final NumberPath<Long> contentLike = createNumber("contentLike", Long.class);

    public final NumberPath<Long> memberIdx = createNumber("memberIdx", Long.class);

    public final DateTimePath<java.time.LocalDateTime> modDtm = createDateTime("modDtm", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> regDtm = createDateTime("regDtm", java.time.LocalDateTime.class);

    public final NumberPath<Long> wordContentIdx = createNumber("wordContentIdx", Long.class);

    public final NumberPath<Long> wordIdx = createNumber("wordIdx", Long.class);

    public QWordContent(String variable) {
        super(WordContent.class, forVariable(variable));
    }

    public QWordContent(Path<? extends WordContent> path) {
        super(path.getType(), path.getMetadata());
    }

    public QWordContent(PathMetadata metadata) {
        super(WordContent.class, metadata);
    }

}

