package com.example.globalhistorybe.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class NotificationResponse {
    private Long id;
    private Long actorId;
    private String actorName;
    private Long relatedId;
    private String relatedType;
    private String title;
    private String message;
    private Boolean isRead;
    private LocalDateTime createdAt;
}
