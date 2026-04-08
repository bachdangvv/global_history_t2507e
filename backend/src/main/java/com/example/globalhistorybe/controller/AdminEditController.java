package com.example.globalhistorybe.controller;

import com.example.globalhistorybe.dto.res.EditResponse;
import com.example.globalhistorybe.entity.User;
import com.example.globalhistorybe.repository.UserRepository;
import com.example.globalhistorybe.service.EditService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/edits")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class AdminEditController {

    private final EditService editService;
    private final UserRepository userRepository;

    @GetMapping("/pending")
    public ResponseEntity<List<EditResponse>> getPendingEdits() {
        return ResponseEntity.ok(editService.getPendingEdits());
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<EditResponse> approveEdit(@PathVariable Long id) {
        return ResponseEntity.ok(editService.approveEdit(id, getCurrentUserId()));
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<EditResponse> rejectEdit(@PathVariable Long id) {
        return ResponseEntity.ok(editService.rejectEdit(id, getCurrentUserId()));
    }

    private Long getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return userRepository.findByEmail(email).map(User::getId).orElseThrow();
    }
}
