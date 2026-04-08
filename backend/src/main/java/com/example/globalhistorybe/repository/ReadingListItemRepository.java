package com.example.globalhistorybe.repository;

import com.example.globalhistorybe.entity.ReadingListItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReadingListItemRepository extends JpaRepository<ReadingListItem, Long> {
    List<ReadingListItem> findByUserIdOrderByCreatedAtDesc(Long userId);
    Optional<ReadingListItem> findByUserIdAndArticleId(Long userId, Long articleId);
    boolean existsByUserIdAndArticleId(Long userId, Long articleId);
}
