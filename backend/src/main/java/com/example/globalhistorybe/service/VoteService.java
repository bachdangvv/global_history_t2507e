package com.example.globalhistorybe.service;

import com.example.globalhistorybe.entity.Vote;
import com.example.globalhistorybe.repository.ArticleRepository;
import com.example.globalhistorybe.repository.VoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VoteService {

    private final VoteRepository voteRepository;
    private final ArticleRepository articleRepository;

    @Transactional
    public Map<String, Object> toggleArticleLike(Long articleId, Long userId) {
        Optional<Vote> existing = voteRepository.findByUserIdAndVotableIdAndVotableType(userId, articleId, "article");

        if (existing.isPresent()) {
            Vote vote = existing.get();
            if ("like".equals(vote.getVoteType())) {
                // Remove like
                voteRepository.delete(vote);
                articleRepository.decrementLikeCount(articleId);
                return Map.of("action", "unliked");
            } else {
                // Change dislike to like
                articleRepository.decrementDislikeCount(articleId);
                vote.setVoteType("like");
                voteRepository.save(vote);
                articleRepository.incrementLikeCount(articleId);
                return Map.of("action", "liked");
            }
        } else {
            // New like
            Vote vote = Vote.builder()
                    .userId(userId)
                    .votableId(articleId)
                    .votableType("article")
                    .voteType("like")
                    .build();
            voteRepository.save(vote);
            articleRepository.incrementLikeCount(articleId);
            return Map.of("action", "liked");
        }
    }

    @Transactional
    public Map<String, Object> voteOnEdit(Long editId, String voteType, Long userId) {
        Optional<Vote> existing = voteRepository.findByUserIdAndVotableIdAndVotableType(userId, editId, "edit");

        if (existing.isPresent()) {
            Vote vote = existing.get();
            if (vote.getVoteType().equals(voteType)) {
                voteRepository.delete(vote);
                return Map.of("action", "removed");
            } else {
                vote.setVoteType(voteType);
                voteRepository.save(vote);
                return Map.of("action", "changed", "voteType", voteType);
            }
        } else {
            Vote vote = Vote.builder()
                    .userId(userId)
                    .votableId(editId)
                    .votableType("edit")
                    .voteType(voteType)
                    .build();
            voteRepository.save(vote);
            return Map.of("action", "voted", "voteType", voteType);
        }
    }
}
