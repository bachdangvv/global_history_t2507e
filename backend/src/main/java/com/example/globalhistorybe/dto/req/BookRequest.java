package com.example.globalhistorybe.dto.req;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class BookRequest {
    @NotBlank(message = "Title is required")
    private String title;

    private String description;
    private String imageUrl;
    private Integer publicationYear;
    private String isbn;
    private String genre;
    private Float rating;
    private Long authorId;
}
