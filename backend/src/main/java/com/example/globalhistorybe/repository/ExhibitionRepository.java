package com.example.globalhistorybe.repository;

import com.example.globalhistorybe.entity.Exhibition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ExhibitionRepository extends JpaRepository<Exhibition, Long> {
    List<Exhibition> findAllByOrderByStartDateDesc();
    Optional<Exhibition> findBySlug(String slug);
    List<Exhibition> findByStatusOrderByStartDateDesc(String status);

    @Modifying
    @Query("UPDATE Exhibition e SET e.viewCount = e.viewCount + 1 WHERE e.id = :id")
    void incrementViewCount(@Param("id") Long id);
}
