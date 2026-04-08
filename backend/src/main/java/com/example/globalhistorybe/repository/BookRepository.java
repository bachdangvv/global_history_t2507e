package com.example.globalhistorybe.repository;

import com.example.globalhistorybe.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByAuthorIdOrderByPublicationYearAsc(Long authorId);
    Optional<Book> findBySlug(String slug);
}
