package com.example.globalhistorybe.repository;

import com.example.globalhistorybe.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, Long> {

    List<Article> findByStatusOrderByPublishedAtDesc(String status);

    List<Article> findByAuthorIdOrderByCreatedAtDesc(Long authorId);

    List<Article> findByStatusAndCategoryIdOrderByPublishedAtDesc(String status, Long categoryId);

    @Query("SELECT a FROM Article a WHERE a.status = 'published' ORDER BY a.viewCount DESC LIMIT 5")
    List<Article> findTop5ByViewCount();

    @Query("SELECT a FROM Article a WHERE a.status = 'published' ORDER BY a.publishedAt DESC LIMIT 8")
    List<Article> findRecommended();

    @Query("SELECT a FROM Article a WHERE a.status = 'published' AND " +
            "(LOWER(a.title) LIKE LOWER(CONCAT('%', :q, '%')) OR LOWER(a.summary) LIKE LOWER(CONCAT('%', :q, '%')) OR LOWER(a.country) LIKE LOWER(CONCAT('%', :q, '%')))")
    List<Article> searchPublished(@Param("q") String query);

    Optional<Article> findBySlug(String slug);

    long countByStatus(String status);

    @Modifying
    @Query("UPDATE Article a SET a.viewCount = a.viewCount + 1 WHERE a.id = :id")
    void incrementViewCount(@Param("id") Long id);

    @Modifying
    @Query("UPDATE Article a SET a.likeCount = a.likeCount + 1 WHERE a.id = :id")
    void incrementLikeCount(@Param("id") Long id);

    @Modifying
    @Query("UPDATE Article a SET a.likeCount = a.likeCount - 1 WHERE a.id = :id AND a.likeCount > 0")
    void decrementLikeCount(@Param("id") Long id);

    @Modifying
    @Query("UPDATE Article a SET a.dislikeCount = a.dislikeCount + 1 WHERE a.id = :id")
    void incrementDislikeCount(@Param("id") Long id);

    @Modifying
    @Query("UPDATE Article a SET a.dislikeCount = a.dislikeCount - 1 WHERE a.id = :id AND a.dislikeCount > 0")
    void decrementDislikeCount(@Param("id") Long id);

    @Modifying
    @Query("UPDATE Article a SET a.commentCount = a.commentCount + 1 WHERE a.id = :id")
    void incrementCommentCount(@Param("id") Long id);

    @Modifying
    @Query("UPDATE Article a SET a.commentCount = a.commentCount - 1 WHERE a.id = :id AND a.commentCount > 0")
    void decrementCommentCount(@Param("id") Long id);
}
