package com.example.globalhistorybe.service;

import com.example.globalhistorybe.dto.res.ArticleResponse;
import com.example.globalhistorybe.entity.Article;
import com.example.globalhistorybe.entity.ReadingListItem;
import com.example.globalhistorybe.exception.ResourceNotFoundException;
import com.example.globalhistorybe.repository.ArticleRepository;
import com.example.globalhistorybe.repository.ReadingListItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReadingListService {

    private final ReadingListItemRepository readingListRepository;
    private final ArticleRepository articleRepository;
    private final ArticleService articleService;

    public List<ArticleResponse> getUserReadingList(Long userId) {
        return readingListRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(item -> {
                    Article article = articleRepository.findById(item.getArticleId()).orElse(null);
                    return article != null ? articleService.toResponse(article) : null;
                })
                .filter(a -> a != null)
                .collect(Collectors.toList());
    }

    @Transactional
    public void addToReadingList(Long userId, Long articleId) {
        if (!articleRepository.existsById(articleId)) {
            throw new ResourceNotFoundException("Article", articleId);
        }
        if (readingListRepository.existsByUserIdAndArticleId(userId, articleId)) {
            throw new IllegalArgumentException("Article already in reading list");
        }

        ReadingListItem item = ReadingListItem.builder()
                .userId(userId)
                .articleId(articleId)
                .build();
        readingListRepository.save(item);
    }

    @Transactional
    public void removeFromReadingList(Long userId, Long articleId) {
        ReadingListItem item = readingListRepository.findByUserIdAndArticleId(userId, articleId)
                .orElseThrow(() -> new ResourceNotFoundException("Reading list item not found"));
        readingListRepository.delete(item);
    }
}
