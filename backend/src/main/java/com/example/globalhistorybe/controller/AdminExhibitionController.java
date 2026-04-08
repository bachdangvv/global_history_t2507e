package com.example.globalhistorybe.controller;

import com.example.globalhistorybe.dto.req.ExhibitionRequest;
import com.example.globalhistorybe.dto.res.ExhibitionResponse;
import com.example.globalhistorybe.entity.User;
import com.example.globalhistorybe.repository.UserRepository;
import com.example.globalhistorybe.service.ExhibitionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/exhibitions")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class AdminExhibitionController {

    private final ExhibitionService exhibitionService;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<ExhibitionResponse>> getAll() {
        return ResponseEntity.ok(exhibitionService.getAllExhibitions());
    }

    @PostMapping
    public ResponseEntity<ExhibitionResponse> create(@Valid @RequestBody ExhibitionRequest request) {
        return ResponseEntity.ok(exhibitionService.createExhibition(request, getCurrentUserId()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExhibitionResponse> update(@PathVariable Long id,
                                                     @Valid @RequestBody ExhibitionRequest request) {
        return ResponseEntity.ok(exhibitionService.updateExhibition(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        exhibitionService.deleteExhibition(id);
        return ResponseEntity.noContent().build();
    }

    private Long getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return userRepository.findByEmail(email).map(User::getId).orElseThrow();
    }
}
