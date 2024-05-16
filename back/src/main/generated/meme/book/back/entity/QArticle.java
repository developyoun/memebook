package meme.book.back.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QArticle is a Querydsl query type for Article
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QArticle extends EntityPathBase<Article> {

    private static final long serialVersionUID = -69487061L;

    public static final QArticle article = new QArticle("article");

    public final StringPath articleContent = createString("articleContent");

    public final NumberPath<Long> articleIdx = createNumber("articleIdx", Long.class);

    public final NumberPath<Long> articleLikeCnt = createNumber("articleLikeCnt", Long.class);

    public final StringPath articleTitle = createString("articleTitle");

    public final NumberPath<Long> memberIdx = createNumber("memberIdx", Long.class);

    public final DateTimePath<java.time.LocalDateTime> regDtm = createDateTime("regDtm", java.time.LocalDateTime.class);

    public QArticle(String variable) {
        super(Article.class, forVariable(variable));
    }

    public QArticle(Path<? extends Article> path) {
        super(path.getType(), path.getMetadata());
    }

    public QArticle(PathMetadata metadata) {
        super(Article.class, metadata);
    }

}

