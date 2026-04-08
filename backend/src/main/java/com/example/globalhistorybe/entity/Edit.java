package com.example.globalhistorybe.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "edits")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Edit {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "editor_id", nullable = false)
    private Long editorId;

    @Column(name = "editable_id", nullable = false)
    private Long editableId;

    @Column(name = "editable_type", nullable = false, length = 30)
    private String editableType; // "article" or "historical_event"

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column(columnDefinition = "LONGTEXT")
    private String content;

    private String thumbnail;

    @Column(nullable = false, length = 20) @Builder.Default
    private String status = "pending"; // pending, approved, rejected

    @Column(name = "reviewed_by")
    private Long reviewedBy;

    @Column(name = "upvote_count") @Builder.Default
    private Integer upvoteCount = 0;

    @Column(name = "downvote_count") @Builder.Default
    private Integer downvoteCount = 0;

    @Column(name = "reviewed_at")
    private LocalDateTime reviewedAt;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() { createdAt = LocalDateTime.now(); }
}
