package com.example.globalhistorybe.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class BookResponse {
    private Long id;
    private Long authorId;
    private String authorName;
    private String title;
    private String slug;
    private String description;
    private String imageUrl;
    private Integer publicationYear;
    private String isbn;
    private String genre;
    private Float rating;
    private LocalDateTime createdAt;
}
