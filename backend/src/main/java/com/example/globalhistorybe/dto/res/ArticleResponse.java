package com.example.globalhistorybe.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class ArticleResponse {
    private Long id;
    private String title;
    private String slug;
    private String summary;
    private String content;
    private String imageUrl;
    private String country;
    private String status;
    private Integer viewCount;
    private Integer likeCount;
    private Integer dislikeCount;
    private Integer commentCount;
    private Long categoryId;
    private String categoryName;
    private Long authorId;
    private String authorName;
    private LocalDateTime publishedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<TopicDto> topics;
    private List<TagDto> tags;

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class TopicDto {
        private Long id;
        private String name;
        private String slug;
    }

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class TagDto {
        private Long id;
        private String name;
    }
}
