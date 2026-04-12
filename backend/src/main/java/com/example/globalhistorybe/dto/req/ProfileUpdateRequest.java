package com.example.globalhistorybe.dto.req;

import lombok.Data;

@Data
public class ProfileUpdateRequest {
    private String username;
    private String email;
    private String bio;
    private String avatarUrl;
}
