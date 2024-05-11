package meme.book.back.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QComment is a Querydsl query type for Comment
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QComment extends EntityPathBase<Comment> {

    private static final long serialVersionUID = 1613289364L;

    public static final QComment comment = new QComment("comment");

    public final StringPath articleIdx = createString("articleIdx");

    public final NumberPath<Long> commentContent = createNumber("commentContent", Long.class);

    public final NumberPath<Long> commentIdx = createNumber("commentIdx", Long.class);

    public final NumberPath<Long> commentLikeCnt = createNumber("commentLikeCnt", Long.class);

    public final NumberPath<Integer> level = createNumber("level", Integer.class);

    public final NumberPath<Long> memberIdx = createNumber("memberIdx", Long.class);

    public final DateTimePath<java.time.LocalDateTime> regDtm = createDateTime("regDtm", java.time.LocalDateTime.class);

    public QComment(String variable) {
        super(Comment.class, forVariable(variable));
    }

    public QComment(Path<? extends Comment> path) {
        super(path.getType(), path.getMetadata());
    }

    public QComment(PathMetadata metadata) {
        super(Comment.class, metadata);
    }

}

