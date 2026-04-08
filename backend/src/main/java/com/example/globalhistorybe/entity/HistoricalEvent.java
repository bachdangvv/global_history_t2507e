package com.example.globalhistorybe.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "historical_events")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class HistoricalEvent {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "creator_id", nullable = false)
    private Long creatorId;

    @Column(name = "reviewed_by")
    private Long reviewedBy;

    @Column(name = "current_edit_id")
    private Long currentEditId;

    @Column(nullable = false)
    private String title;

    @Column(unique = true, length = 300)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column(name = "event_year")
    private Integer eventYear;

    @Column(name = "event_date")
    private LocalDate eventDate;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "view_count") @Builder.Default
    private Integer viewCount = 0;

    @Column(name = "reviewed_at")
    private LocalDateTime reviewedAt;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (slug == null) slug = title.toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", "");
    }
}