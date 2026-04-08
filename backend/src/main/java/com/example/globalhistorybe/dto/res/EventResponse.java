package com.example.globalhistorybe.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class EventResponse {
    private Long id;
    private Long creatorId;
    private String creatorName;
    private String title;
    private String slug;
    private String summary;
    private Integer eventYear;
    private LocalDate eventDate;
    private String imageUrl;
    private Integer viewCount;
    private LocalDateTime createdAt;
}
