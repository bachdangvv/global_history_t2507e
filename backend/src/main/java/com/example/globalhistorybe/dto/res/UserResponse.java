package com.example.globalhistorybe.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private String avatarUrl;
    private String role;
    private Boolean isLocked;
    private String bio;
    private Integer viewCount;
    private Integer likeCount;
    private LocalDateTime lastActiveAt;
    private LocalDateTime createdAt;
}
