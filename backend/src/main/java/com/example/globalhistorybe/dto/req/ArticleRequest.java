package com.example.globalhistorybe.dto.req;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.util.List;

@Data
public class ArticleRequest {
    @NotBlank(message = "Title is required")
    private String title;

    private String summary;
    private String content;
    private String imageUrl;
    private String country;
    private Long categoryId;
    private List<Long> topicIds;
    private List<Long> tagIds;
}
