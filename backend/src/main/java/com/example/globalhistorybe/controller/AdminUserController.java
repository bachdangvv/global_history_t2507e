package com.example.globalhistorybe.controller;

import com.example.globalhistorybe.dto.req.RoleUpdateRequest;
import com.example.globalhistorybe.dto.res.UserResponse;
import com.example.globalhistorybe.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class AdminUserController {

    private final AdminService adminService;

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {

        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<UserResponse> updateRole(@PathVariable Long id,
                                                   @RequestBody RoleUpdateRequest request) {
        return ResponseEntity.ok(adminService.updateUserRole(id, request.getRole()));
    }

    @PostMapping("/{id}/toggle-lock")
    public ResponseEntity<UserResponse> toggleLock(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.toggleLock(id));
    }
}
