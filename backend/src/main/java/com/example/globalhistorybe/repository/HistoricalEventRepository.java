package com.example.globalhistorybe.repository;

import com.example.globalhistorybe.entity.HistoricalEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HistoricalEventRepository extends JpaRepository<HistoricalEvent, Long> {
    List<HistoricalEvent> findAllByOrderByEventYearAsc();
    Optional<HistoricalEvent> findBySlug(String slug);

    @org.springframework.data.jpa.repository.Modifying
    @org.springframework.data.jpa.repository.Query("UPDATE HistoricalEvent e SET e.viewCount = e.viewCount + 1 WHERE e.id = :id")
    void incrementViewCount(@org.springframework.data.repository.query.Param("id") Long id);
}
