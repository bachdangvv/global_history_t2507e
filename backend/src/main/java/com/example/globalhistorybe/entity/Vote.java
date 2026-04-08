package com.example.globalhistorybe.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "votes", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "votable_id", "votable_type"}))
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Vote {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "votable_id", nullable = false)
    private Long votableId;

    @Column(name = "votable_type", nullable = false, length = 30)
    private String votableType; // "article" or "edit"

    @Column(name = "vote_type", nullable = false, length = 20)
    private String voteType; // "like", "dislike", "upvote", "downvote"

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() { createdAt = LocalDateTime.now(); }
}
