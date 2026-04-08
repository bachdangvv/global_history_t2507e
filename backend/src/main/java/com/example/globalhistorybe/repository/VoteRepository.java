package com.example.globalhistorybe.repository;

import com.example.globalhistorybe.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VoteRepository extends JpaRepository<Vote, Long> {
    Optional<Vote> findByUserIdAndVotableIdAndVotableType(Long userId, Long votableId, String votableType);
    boolean existsByUserIdAndVotableIdAndVotableType(Long userId, Long votableId, String votableType);
}
