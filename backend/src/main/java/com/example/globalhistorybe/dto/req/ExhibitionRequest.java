package com.example.globalhistorybe.dto.req;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDate;

@Data
public class ExhibitionRequest {
    @NotBlank(message = "Title is required")
    private String title;

    private String description;
    private String imageUrl;
    private String location;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
}
