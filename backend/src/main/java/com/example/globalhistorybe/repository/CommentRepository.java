package com.example.globalhistorybe.repository;

import com.example.globalhistorybe.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByCommentableIdAndCommentableTypeOrderByCreatedAtDesc(Long commentableId, String commentableType);
    List<Comment> findByUserIdOrderByCreatedAtDesc(Long userId);
    long countByCommentableIdAndCommentableType(Long commentableId, String commentableType);
}
