package com.example.globalhistorybe.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class ExhibitionResponse {
    private Long id;
    private String title;
    private String slug;
    private String description;
    private String imageUrl;
    private String location;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
    private Integer viewCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<ArticleResponse> articles;
}
