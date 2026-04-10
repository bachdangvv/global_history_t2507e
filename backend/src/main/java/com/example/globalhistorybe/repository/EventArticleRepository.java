package com.example.globalhistorybe.repository;

import com.example.globalhistorybe.entity.EventArticle;
import com.example.globalhistorybe.entity.EventArticleId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventArticleRepository extends JpaRepository<EventArticle, EventArticleId> {
    List<EventArticle> findByEventId(Long eventId);
    long countByEventId(Long eventId);
    boolean existsByEventIdAndArticleId(Long eventId, Long articleId);
    void deleteByEventIdAndArticleId(Long eventId, Long articleId);
}
