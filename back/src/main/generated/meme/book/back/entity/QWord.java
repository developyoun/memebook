package meme.book.back.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QWord is a Querydsl query type for Word
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QWord extends EntityPathBase<Word> {

    private static final long serialVersionUID = -536382987L;

    public static final QWord word = new QWord("word");

    public final DateTimePath<java.time.LocalDateTime> modDtm = createDateTime("modDtm", java.time.LocalDateTime.class);

    public final NumberPath<Long> modMem = createNumber("modMem", Long.class);

    public final DateTimePath<java.time.LocalDateTime> regDtm = createDateTime("regDtm", java.time.LocalDateTime.class);

    public final NumberPath<Long> regMem = createNumber("regMem", Long.class);

    public final StringPath wordContent = createString("wordContent");

    public final NumberPath<Long> wordDislike = createNumber("wordDislike", Long.class);

    public final NumberPath<Long> wordIdx = createNumber("wordIdx", Long.class);

    public final NumberPath<Long> wordLike = createNumber("wordLike", Long.class);

    public final EnumPath<meme.book.back.utils.NationCode> wordNation = createEnum("wordNation", meme.book.back.utils.NationCode.class);

    public final StringPath wordTitle = createString("wordTitle");

    public QWord(String variable) {
        super(Word.class, forVariable(variable));
    }

    public QWord(Path<? extends Word> path) {
        super(path.getType(), path.getMetadata());
    }

    public QWord(PathMetadata metadata) {
        super(Word.class, metadata);
    }

}

