package com.example.globalhistorybe.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "event_articles")
@IdClass(EventArticleId.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventArticle {
    @Id
    @Column(name = "event_id")
    private Long eventId;

    @Id
    @Column(name = "article_id")
    private Long articleId;
}
