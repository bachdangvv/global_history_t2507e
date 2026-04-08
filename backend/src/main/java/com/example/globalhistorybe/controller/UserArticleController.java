package com.example.globalhistorybe.controller;

import com.example.globalhistorybe.dto.req.ArticleRequest;
import com.example.globalhistorybe.dto.res.ArticleResponse;
import com.example.globalhistorybe.dto.req.CommentRequest;
import com.example.globalhistorybe.dto.res.CommentResponse;
import com.example.globalhistorybe.entity.User;
import com.example.globalhistorybe.repository.UserRepository;
import com.example.globalhistorybe.service.ArticleService;
import com.example.globalhistorybe.service.CommentService;
import com.example.globalhistorybe.service.VoteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class UserArticleController {

    private final ArticleService articleService;
    private final CommentService commentService;
    private final VoteService voteService;
    private final UserRepository userRepository;

    @PostMapping("/articles")
    public ResponseEntity<ArticleResponse> createArticle(@Valid @RequestBody ArticleRequest request) {
        return ResponseEntity.ok(articleService.createArticle(request, getCurrentUserId()));
    }

    @PutMapping("/articles/{id}")
    public ResponseEntity<ArticleResponse> updateArticle(@PathVariable Long id,
                                                         @Valid @RequestBody ArticleRequest request) {
        return ResponseEntity.ok(articleService.updateArticle(id, request, getCurrentUserId()));
    }

    @DeleteMapping("/articles/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        articleService.deleteUserArticle(id, getCurrentUserId());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/articles/{id}/like")
    public ResponseEntity<Map<String, Object>> likeArticle(@PathVariable Long id) {
        return ResponseEntity.ok(voteService.toggleArticleLike(id, getCurrentUserId()));
    }

    @PostMapping("/articles/{id}/comments")
    public ResponseEntity<CommentResponse> addComment(@PathVariable Long id,
                                                      @Valid @RequestBody CommentRequest request) {
        return ResponseEntity.ok(commentService.addComment(id, request, getCurrentUserId()));
    }

    @GetMapping("/my/articles")
    public ResponseEntity<List<ArticleResponse>> myArticles() {
        return ResponseEntity.ok(articleService.getArticlesByAuthor(getCurrentUserId()));
    }

    @GetMapping("/my/comments")
    public ResponseEntity<List<CommentResponse>> myComments() {
        return ResponseEntity.ok(commentService.getUserComments(getCurrentUserId()));
    }

    private Long getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return userRepository.findByEmail(email).map(User::getId).orElseThrow();
    }
}
