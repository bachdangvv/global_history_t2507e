package com.example.globalhistorybe.dto.req;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AuthorRequest {
    @NotBlank(message = "Name is required")
    private String name;

    private String biography;
    private String imageUrl;
    private String nationality;
    private Integer birthYear;
    private Integer deathYear;
    private String era;
}
