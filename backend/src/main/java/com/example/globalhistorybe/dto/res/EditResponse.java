package com.example.globalhistorybe.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class EditResponse {
    private Long id;
    private Long editorId;
    private String editorName;
    private Long editableId;
    private String editableType;
    private String title;
    private String summary;
    private String content;
    private String thumbnail;
    private String status;
    private Long reviewedBy;
    private String reviewerName;
    private Integer upvoteCount;
    private Integer downvoteCount;
    private LocalDateTime reviewedAt;
    private LocalDateTime createdAt;
}
