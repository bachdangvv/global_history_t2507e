package com.example.globalhistorybe.repository;

import com.example.globalhistorybe.entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthorRepository extends JpaRepository<Author, Long> {
    Optional<Author> findBySlug(String slug);
}
