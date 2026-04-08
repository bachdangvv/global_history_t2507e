package com.example.globalhistorybe.dto.req;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDate;

@Data
public class EventRequest {
    @NotBlank(message = "Title is required")
    private String title;

    private String summary;
    private Integer eventYear;
    private LocalDate eventDate;
    private String imageUrl;
}
