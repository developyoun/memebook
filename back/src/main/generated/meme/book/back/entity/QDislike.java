package meme.book.back.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QDislike is a Querydsl query type for Dislike
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDislike extends EntityPathBase<Dislike> {

    private static final long serialVersionUID = -1960434086L;

    public static final QDislike dislike = new QDislike("dislike");

    public final NumberPath<Long> likeIdx = createNumber("likeIdx", Long.class);

    public final NumberPath<Long> memberIdx = createNumber("memberIdx", Long.class);

    public final DateTimePath<java.time.LocalDateTime> regDtm = createDateTime("regDtm", java.time.LocalDateTime.class);

    public final NumberPath<Long> wordIdx = createNumber("wordIdx", Long.class);

    public QDislike(String variable) {
        super(Dislike.class, forVariable(variable));
    }

    public QDislike(Path<? extends Dislike> path) {
        super(path.getType(), path.getMetadata());
    }

    public QDislike(PathMetadata metadata) {
        super(Dislike.class, metadata);
    }

}

