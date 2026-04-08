package com.example.globalhistorybe.repository;

import com.example.globalhistorybe.entity.HistoricalEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HistoricalEventRepository extends JpaRepository<HistoricalEvent, Long> {
    List<HistoricalEvent> findAllByOrderByEventYearAsc();
    Optional<HistoricalEvent> findBySlug(String slug);
}
