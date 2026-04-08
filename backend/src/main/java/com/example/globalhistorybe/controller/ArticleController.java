package com.example.globalhistorybe.controller;

import com.example.globalhistorybe.dto.res.ArticleResponse;
import com.example.globalhistorybe.dto.res.CommentResponse;
import com.example.globalhistorybe.service.ArticleService;
import com.example.globalhistorybe.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class ArticleController {

    private final ArticleService articleService;
    private final CommentService commentService;

    @GetMapping("/search")
    public ResponseEntity<List<ArticleResponse>> search(@RequestParam(defaultValue = "") String q) {
        if (q.isBlank()) {
            return ResponseEntity.ok(articleService.getPublishedArticles());
        }
        return ResponseEntity.ok(articleService.searchArticles(q));
    }

    @GetMapping("/top")
    public ResponseEntity<List<ArticleResponse>> getTopArticles() {
        return ResponseEntity.ok(articleService.getTopArticles());
    }

    @GetMapping("/recommended")
    public ResponseEntity<List<ArticleResponse>> getRecommended() {
        return ResponseEntity.ok(articleService.getRecommendedArticles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleResponse> getArticle(@PathVariable Long id) {
        return ResponseEntity.ok(articleService.getArticleById(id));
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<List<CommentResponse>> getComments(@PathVariable Long id) {
        return ResponseEntity.ok(commentService.getArticleComments(id));
    }
}
