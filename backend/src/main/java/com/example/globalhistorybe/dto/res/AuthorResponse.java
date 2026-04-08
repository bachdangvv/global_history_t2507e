package com.example.globalhistorybe.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class AuthorResponse {
    private Long id;
    private String name;
    private String slug;
    private String biography;
    private String imageUrl;
    private String nationality;
    private Integer birthYear;
    private Integer deathYear;
    private String era;
    private LocalDateTime createdAt;
    private List<BookResponse> books;
}
