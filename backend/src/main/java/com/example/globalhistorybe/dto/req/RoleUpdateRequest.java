package com.example.globalhistorybe.dto.req;

import lombok.Data;

@Data
public class RoleUpdateRequest {
    private String role; // "ADMIN" or "USER"
}
