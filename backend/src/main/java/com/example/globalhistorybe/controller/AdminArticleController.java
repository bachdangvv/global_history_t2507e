package com.example.globalhistorybe.controller;

import com.example.globalhistorybe.dto.res.ArticleResponse;
import com.example.globalhistorybe.dto.req.StatusUpdateRequest;
import com.example.globalhistorybe.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/articles")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class AdminArticleController {

    private final ArticleService articleService;

    @GetMapping
    public ResponseEntity<List<ArticleResponse>> getAllArticles() {
        return ResponseEntity.ok(articleService.getAllArticles());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ArticleResponse> updateStatus(@PathVariable Long id,
                                                        @RequestBody StatusUpdateRequest request) {
        return ResponseEntity.ok(articleService.updateArticleStatus(id, request.getStatus()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        articleService.deleteArticle(id);
        return ResponseEntity.noContent().build();
    }
}
