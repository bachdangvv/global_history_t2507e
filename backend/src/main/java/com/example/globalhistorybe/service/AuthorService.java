package com.example.globalhistorybe.service;

import com.example.globalhistorybe.dto.req.AuthorRequest;
import com.example.globalhistorybe.dto.res.AuthorResponse;
import com.example.globalhistorybe.dto.res.BookResponse;
import com.example.globalhistorybe.entity.Author;
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
public class AuthorService {

    private final AuthorRepository authorRepository;
    private final BookRepository bookRepository;

    public List<AuthorResponse> getAllAuthors() {
        return authorRepository.findAll().stream()
                .map(a -> toResponse(a, false)).collect(Collectors.toList());
    }

    public AuthorResponse getAuthorById(Long id) {
        Author author = authorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Author", id));
        return toResponse(author, true);
    }

    @Transactional
    public AuthorResponse createAuthor(AuthorRequest request) {
        Author author = Author.builder()
                .name(request.getName())
                .biography(request.getBiography())
                .imageUrl(request.getImageUrl())
                .nationality(request.getNationality())
                .birthYear(request.getBirthYear())
                .deathYear(request.getDeathYear())
                .era(request.getEra())
                .build();
        author = authorRepository.save(author);
        return toResponse(author, false);
    }

    @Transactional
    public AuthorResponse updateAuthor(Long id, AuthorRequest request) {
        Author author = authorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Author", id));
        author.setName(request.getName());
        author.setBiography(request.getBiography());
        author.setImageUrl(request.getImageUrl());
        author.setNationality(request.getNationality());
        author.setBirthYear(request.getBirthYear());
        author.setDeathYear(request.getDeathYear());
        author.setEra(request.getEra());
        author.setSlug(request.getName().toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", ""));
        author = authorRepository.save(author);
        return toResponse(author, false);
    }

    @Transactional
    public void deleteAuthor(Long id) {
        if (!authorRepository.existsById(id)) throw new ResourceNotFoundException("Author", id);
        authorRepository.deleteById(id);
    }

    private AuthorResponse toResponse(Author author, boolean includeBooks) {
        AuthorResponse.AuthorResponseBuilder builder = AuthorResponse.builder()
                .id(author.getId())
                .name(author.getName())
                .slug(author.getSlug())
                .biography(author.getBiography())
                .imageUrl(author.getImageUrl())
                .nationality(author.getNationality())
                .birthYear(author.getBirthYear())
                .deathYear(author.getDeathYear())
                .era(author.getEra())
                .createdAt(author.getCreatedAt());

        if (includeBooks) {
            List<BookResponse> books = bookRepository.findByAuthorIdOrderByPublicationYearAsc(author.getId())
                    .stream().map(b -> BookResponse.builder()
                            .id(b.getId())
                            .authorId(b.getAuthorId())
                            .authorName(author.getName())
                            .title(b.getTitle())
                            .slug(b.getSlug())
                            .description(b.getDescription())
                            .imageUrl(b.getImageUrl())
                            .publicationYear(b.getPublicationYear())
                            .isbn(b.getIsbn())
                            .genre(b.getGenre())
                            .rating(b.getRating())
                            .createdAt(b.getCreatedAt())
                            .build())
                    .collect(Collectors.toList());
            builder.books(books);
        }

        return builder.build();
    }
}
