package meme.book.back.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QReports is a Querydsl query type for Reports
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReports extends EntityPathBase<Reports> {

    private static final long serialVersionUID = 1757494004L;

    public static final QReports reports = new QReports("reports");

    public final NumberPath<Long> reportIdx = createNumber("reportIdx", Long.class);

    public final NumberPath<Long> reportMem = createNumber("reportMem", Long.class);

    public final DateTimePath<java.time.LocalDateTime> reportRegDtm = createDateTime("reportRegDtm", java.time.LocalDateTime.class);

    public final NumberPath<Long> reportTarget = createNumber("reportTarget", Long.class);

    public QReports(String variable) {
        super(Reports.class, forVariable(variable));
    }

    public QReports(Path<? extends Reports> path) {
        super(path.getType(), path.getMetadata());
    }

    public QReports(PathMetadata metadata) {
        super(Reports.class, metadata);
    }

}

