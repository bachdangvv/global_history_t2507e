package com.example.globalhistorybe.service;

import com.example.globalhistorybe.dto.req.ArticleRequest;
import com.example.globalhistorybe.dto.res.ArticleResponse;
import com.example.globalhistorybe.entity.Article;
import com.example.globalhistorybe.entity.Category;
import com.example.globalhistorybe.entity.Tag;
import com.example.globalhistorybe.entity.Topic;
import com.example.globalhistorybe.entity.User;
import com.example.globalhistorybe.exception.ResourceNotFoundException;
import com.example.globalhistorybe.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final TopicRepository topicRepository;
    private final TagRepository tagRepository;

    public List<ArticleResponse> getPublishedArticles() {
        return articleRepository.findByStatusOrderByPublishedAtDesc("published")
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<ArticleResponse> searchArticles(String query) {
        return articleRepository.searchPublished(query)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<ArticleResponse> getTopArticles() {
        return articleRepository.findTop5ByViewCount()
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<ArticleResponse> getRecommendedArticles() {
        return articleRepository.findRecommended()
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional
    public ArticleResponse getArticleById(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article", id));
        articleRepository.incrementViewCount(id);
        return toResponse(article);
    }

    public List<ArticleResponse> getArticlesByAuthor(Long authorId) {
        return articleRepository.findByAuthorIdOrderByCreatedAtDesc(authorId)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<ArticleResponse> getAllArticles() {
        return articleRepository.findAll()
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional
    public ArticleResponse createArticle(ArticleRequest request, Long userId) {
        Article article = Article.builder()
                .authorId(userId)
                .title(request.getTitle())
                .summary(request.getSummary())
                .content(request.getContent())
                .imageUrl(request.getImageUrl())
                .country(request.getCountry())
                .categoryId(request.getCategoryId())
                .status("review")
                .build();

        if (request.getTopicIds() != null && !request.getTopicIds().isEmpty()) {
            Set<Topic> topics = new HashSet<>(topicRepository.findAllById(request.getTopicIds()));
            article.setTopics(topics);
        }

        if (request.getTagIds() != null && !request.getTagIds().isEmpty()) {
            Set<Tag> tags = new HashSet<>(tagRepository.findAllById(request.getTagIds()));
            article.setTags(tags);
        }

        article = articleRepository.save(article);
        return toResponse(article);
    }

    @Transactional
    public ArticleResponse updateArticle(Long id, ArticleRequest request, Long userId) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article", id));

        if (!article.getAuthorId().equals(userId)) {
            throw new IllegalArgumentException("You can only edit your own articles");
        }
        if (!"draft".equals(article.getStatus()) && !"review".equals(article.getStatus())) {
            throw new IllegalArgumentException("Only draft or review articles can be edited directly");
        }

        article.setTitle(request.getTitle());
        article.setSummary(request.getSummary());
        article.setContent(request.getContent());
        article.setImageUrl(request.getImageUrl());
        article.setCountry(request.getCountry());
        article.setCategoryId(request.getCategoryId());

        if (request.getTopicIds() != null) {
            Set<Topic> topics = new HashSet<>(topicRepository.findAllById(request.getTopicIds()));
            article.setTopics(topics);
        }

        if (request.getTagIds() != null) {
            Set<Tag> tags = new HashSet<>(tagRepository.findAllById(request.getTagIds()));
            article.setTags(tags);
        }

        article.setSlug(request.getTitle().toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", ""));
        article = articleRepository.save(article);
        return toResponse(article);
    }

    @Transactional
    public void deleteUserArticle(Long id, Long userId) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article", id));
        if (!article.getAuthorId().equals(userId)) {
            throw new IllegalArgumentException("You can only delete your own articles");
        }
        if (!"draft".equals(article.getStatus())) {
            throw new IllegalArgumentException("Only draft articles can be deleted by users");
        }
        articleRepository.delete(article);
    }

    @Transactional
    public ArticleResponse updateArticleStatus(Long id, String status) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article", id));
        article.setStatus(status);
        if ("published".equals(status) && article.getPublishedAt() == null) {
            article.setPublishedAt(LocalDateTime.now());
        }
        article = articleRepository.save(article);
        return toResponse(article);
    }

    @Transactional
    public void deleteArticle(Long id) {
        if (!articleRepository.existsById(id)) {
            throw new ResourceNotFoundException("Article", id);
        }
        articleRepository.deleteById(id);
    }

    public ArticleResponse toResponse(Article article) {
        String authorName = userRepository.findById(article.getAuthorId())
                .map(User::getUsername).orElse("Unknown");
        String categoryName = null;
        if (article.getCategoryId() != null) {
            categoryName = categoryRepository.findById(article.getCategoryId())
                    .map(Category::getName).orElse(null);
        }

        List<ArticleResponse.TopicDto> topicDtos = article.getTopics() != null
                ? article.getTopics().stream()
                .map(t -> ArticleResponse.TopicDto.builder()
                        .id(t.getId()).name(t.getName()).slug(t.getSlug()).build())
                .collect(Collectors.toList())
                : List.of();

        List<ArticleResponse.TagDto> tagDtos = article.getTags() != null
                ? article.getTags().stream()
                .map(t -> ArticleResponse.TagDto.builder()
                        .id(t.getId()).name(t.getName()).build())
                .collect(Collectors.toList())
                : List.of();

        return ArticleResponse.builder()
                .id(article.getId())
                .title(article.getTitle())
                .slug(article.getSlug())
                .summary(article.getSummary())
                .content(article.getContent())
                .imageUrl(article.getImageUrl())
                .country(article.getCountry())
                .status(article.getStatus())
                .viewCount(article.getViewCount())
                .likeCount(article.getLikeCount())
                .dislikeCount(article.getDislikeCount())
                .commentCount(article.getCommentCount())
                .categoryId(article.getCategoryId())
                .categoryName(categoryName)
                .authorId(article.getAuthorId())
                .authorName(authorName)
                .publishedAt(article.getPublishedAt())
                .createdAt(article.getCreatedAt())
                .updatedAt(article.getUpdatedAt())
                .topics(topicDtos)
                .tags(tagDtos)
                .build();
    }
}
