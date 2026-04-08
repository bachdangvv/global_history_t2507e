package com.example.globalhistorybe.service;

import com.example.globalhistorybe.dto.res.DashboardStats;
import com.example.globalhistorybe.dto.res.UserResponse;
import com.example.globalhistorybe.entity.User;
import com.example.globalhistorybe.exception.ResourceNotFoundException;
import com.example.globalhistorybe.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository UserRepository;
    private final ArticleRepository ArticleRepository;
    private final CommentRepository CommentRepository;
    private final EditRepository EditRepository;
    private final HistoricalEventRepository EventRepository;
    private final ExhibitionRepository ExhibitionRepository;
    private final AuthorRepository AuthorRepository;
    private final BookRepository BookRepository;
    private final TopicRepository TopicRepository;
    private final TagRepository TagRepository;

    public DashboardStats getDashboardStats() {
        return DashboardStats.builder()
                .totalArticles(ArticleRepository.count())
                .publishedArticles(ArticleRepository.countByStatus("published"))
                .pendingReviewArticles(ArticleRepository.countByStatus("review"))
                .draftArticles(ArticleRepository.countByStatus("draft"))
                .totalUsers(UserRepository.count())
                .totalComments(CommentRepository.count())
                .pendingEdits(EditRepository.countByStatus("pending"))
                .totalEvents(EventRepository.count())
                .totalExhibitions(ExhibitionRepository.count())
                .totalAuthors(AuthorRepository.count())
                .totalBooks(BookRepository.count())
                .totalTopics(TopicRepository.count())
                .totalTags(TagRepository.count())
                .build();
    }

    public List<UserResponse> getAllUsers() {
        return UserRepository.findAll().stream()
                .map(this::toUserResponse).collect(Collectors.toList());
    }

    @Transactional
    public UserResponse updateUserRole(Long userId, String role) {
        User user = UserRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", userId));
        user.setRole(User.Role.valueOf(role));
        user = UserRepository.save(user);
        return toUserResponse(user);
    }

    @Transactional
    public UserResponse toggleLock(Long userId) {
        User user = UserRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", userId));
        user.setIsLocked(!Boolean.TRUE.equals(user.getIsLocked()));
        user = UserRepository.save(user);
        return toUserResponse(user);
    }

    private UserResponse toUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .avatarUrl(user.getAvatarUrl())
                .role(user.getRole().name())
                .isLocked(user.getIsLocked())
                .bio(user.getBio())
                .viewCount(user.getViewCount())
                .likeCount(user.getLikeCount())
                .lastActiveAt(user.getLastActiveAt())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
