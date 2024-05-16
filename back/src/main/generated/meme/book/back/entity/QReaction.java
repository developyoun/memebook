package meme.book.back.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QReaction is a Querydsl query type for Reaction
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReaction extends EntityPathBase<Reaction> {

    private static final long serialVersionUID = -1792731244L;

    public static final QReaction reaction = new QReaction("reaction");

    public final NumberPath<Long> memberIdx = createNumber("memberIdx", Long.class);

    public final NumberPath<Long> reactionIdx = createNumber("reactionIdx", Long.class);

    public final DateTimePath<java.time.LocalDateTime> reactionModDtm = createDateTime("reactionModDtm", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> reactionRegDtm = createDateTime("reactionRegDtm", java.time.LocalDateTime.class);

    public final EnumPath<meme.book.back.utils.ActionType> reactionType = createEnum("reactionType", meme.book.back.utils.ActionType.class);

    public final NumberPath<Long> targetIdx = createNumber("targetIdx", Long.class);

    public QReaction(String variable) {
        super(Reaction.class, forVariable(variable));
    }

    public QReaction(Path<? extends Reaction> path) {
        super(path.getType(), path.getMetadata());
    }

    public QReaction(PathMetadata metadata) {
        super(Reaction.class, metadata);
    }

}

