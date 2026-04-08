package com.example.globalhistorybe.service;

import com.example.globalhistorybe.dto.req.BookRequest;
import com.example.globalhistorybe.dto.res.BookResponse;
import com.example.globalhistorybe.entity.Author;
import com.example.globalhistorybe.entity.Book;
import com.example.globalhistorybe.exception.ResourceNotFoundException;
import com.example.globalhistorybe.repository.AuthorRepository;
import com.example.globalhistorybe.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;

    public List<BookResponse> getAllBooks() {
        return bookRepository.findAll().stream()
                .map(this::toResponse).collect(Collectors.toList());
    }

    public BookResponse getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book", id));
        return toResponse(book);
    }

    @Transactional
    public BookResponse createBook(BookRequest request) {
        Book book = Book.builder()
                .authorId(request.getAuthorId())
                .title(request.getTitle())
                .description(request.getDescription())
                .imageUrl(request.getImageUrl())
                .publicationYear(request.getPublicationYear())
                .isbn(request.getIsbn())
                .genre(request.getGenre())
                .rating(request.getRating())
                .build();
        book = bookRepository.save(book);
        return toResponse(book);
    }

    @Transactional
    public BookResponse updateBook(Long id, BookRequest request) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book", id));
        book.setTitle(request.getTitle());
        book.setDescription(request.getDescription());
        book.setImageUrl(request.getImageUrl());
        book.setPublicationYear(request.getPublicationYear());
        book.setIsbn(request.getIsbn());
        book.setGenre(request.getGenre());
        book.setRating(request.getRating());
        if (request.getAuthorId() != null) book.setAuthorId(request.getAuthorId());
        book.setSlug(request.getTitle().toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", ""));
        book = bookRepository.save(book);
        return toResponse(book);
    }

    @Transactional
    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) throw new ResourceNotFoundException("Book", id);
        bookRepository.deleteById(id);
    }

    private BookResponse toResponse(Book book) {
        String authorName = authorRepository.findById(book.getAuthorId())
                .map(Author::getName).orElse("Unknown");

        return BookResponse.builder()
                .id(book.getId())
                .authorId(book.getAuthorId())
                .authorName(authorName)
                .title(book.getTitle())
                .slug(book.getSlug())
                .description(book.getDescription())
                .imageUrl(book.getImageUrl())
                .publicationYear(book.getPublicationYear())
                .isbn(book.getIsbn())
                .genre(book.getGenre())
                .rating(book.getRating())
                .createdAt(book.getCreatedAt())
                .build();
    }
}
