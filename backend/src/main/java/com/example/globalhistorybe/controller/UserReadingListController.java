package com.example.globalhistorybe.controller;

import com.example.globalhistorybe.dto.res.ArticleResponse;
import com.example.globalhistorybe.entity.User;
import com.example.globalhistorybe.repository.UserRepository;
import com.example.globalhistorybe.service.ReadingListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/my/reading-list")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class UserReadingListController {

    private final ReadingListService readingListService;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<ArticleResponse>> getReadingList() {
        return ResponseEntity.ok(readingListService.getUserReadingList(getCurrentUserId()));
    }

    @PostMapping("/{articleId}")
    public ResponseEntity<Void> addToReadingList(@PathVariable Long articleId) {
        readingListService.addToReadingList(getCurrentUserId(), articleId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{articleId}")
    public ResponseEntity<Void> removeFromReadingList(@PathVariable Long articleId) {
        readingListService.removeFromReadingList(getCurrentUserId(), articleId);
        return ResponseEntity.noContent().build();
    }

    private Long getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return userRepository.findByEmail(email).map(User::getId).orElseThrow();
    }
}
