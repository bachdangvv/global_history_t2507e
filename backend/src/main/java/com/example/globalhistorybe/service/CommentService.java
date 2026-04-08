package com.example.globalhistorybe.service;

import com.example.globalhistorybe.dto.req.CommentRequest;
import com.example.globalhistorybe.dto.res.CommentResponse;
import com.example.globalhistorybe.entity.Comment;
import com.example.globalhistorybe.entity.User;
import com.example.globalhistorybe.repository.ArticleRepository;
import com.example.globalhistorybe.repository.CommentRepository;
import com.example.globalhistorybe.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final ArticleRepository articleRepository;

    public List<CommentResponse> getArticleComments(Long articleId) {
        return commentRepository.findByCommentableIdAndCommentableTypeOrderByCreatedAtDesc(articleId, "article")
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<CommentResponse> getUserComments(Long userId) {
        return commentRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional
    public CommentResponse addComment(Long articleId, CommentRequest request, Long userId) {
        User user = userRepository.findById(userId).orElseThrow();

        Comment comment = Comment.builder()
                .userId(userId)
                .commentableId(articleId)
                .commentableType("article")
                .content(request.getContent())
                .authorName(user.getUsername())
                .build();

        comment = commentRepository.save(comment);
        articleRepository.incrementCommentCount(articleId);
        return toResponse(comment);
    }

    private CommentResponse toResponse(Comment comment) {
        String username = comment.getAuthorName();
        String avatarUrl = null;
        if (comment.getUserId() != null) {
            User user = userRepository.findById(comment.getUserId()).orElse(null);
            if (user != null) {
                username = user.getUsername();
                avatarUrl = user.getAvatarUrl();
            }
        }

        return CommentResponse.builder()
                .id(comment.getId())
                .userId(comment.getUserId())
                .username(username)
                .avatarUrl(avatarUrl)
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .build();
    }
}
