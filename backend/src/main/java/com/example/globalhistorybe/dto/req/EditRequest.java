package com.example.globalhistorybe.dto.req;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class EditRequest {
    @NotBlank(message = "Title is required")
    private String title;

    private String summary;
    private String content;
    private String thumbnail;
    private Long editableId;
    private String editableType; // "article" or "historical_event"
}
