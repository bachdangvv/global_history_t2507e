package com.example.globalhistorybe.service;

import com.example.globalhistorybe.entity.Edit;
import com.example.globalhistorybe.entity.Vote;
import com.example.globalhistorybe.exception.ResourceNotFoundException;
import com.example.globalhistorybe.repository.ArticleRepository;
import com.example.globalhistorybe.repository.EditRepository;
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
    private final EditRepository editRepository;

    @Transactional
    public Map<String, Object> toggleArticleLike(Long articleId, Long userId) {
        return toggleArticleVote(articleId, "like", userId);
    }

    @Transactional
    public Map<String, Object> toggleArticleVote(Long articleId, String voteType, Long userId) {
        if (!"like".equals(voteType) && !"dislike".equals(voteType)) {
            throw new IllegalArgumentException("Vote type must be like or dislike.");
        }

        if (!articleRepository.existsById(articleId)) {
            throw new ResourceNotFoundException("Article", articleId);
        }

        Optional<Vote> existing = voteRepository.findByUserIdAndVotableIdAndVotableType(userId, articleId, "article");

        if (existing.isPresent()) {
            Vote vote = existing.get();

            if (voteType.equals(vote.getVoteType())) {
                voteRepository.delete(vote);
                updateArticleVoteCount(articleId, voteType, -1);
                return Map.of("action", "removed", "voteType", voteType);
            }

            updateArticleVoteCount(articleId, vote.getVoteType(), -1);
            vote.setVoteType(voteType);
            voteRepository.save(vote);
            updateArticleVoteCount(articleId, voteType, 1);
            return Map.of("action", "changed", "voteType", voteType);
        }

        Vote vote = Vote.builder()
                .userId(userId)
                .votableId(articleId)
                .votableType("article")
                .voteType(voteType)
                .build();
        voteRepository.save(vote);
        updateArticleVoteCount(articleId, voteType, 1);
        return Map.of("action", "voted", "voteType", voteType);
    }

    @Transactional
    public Map<String, Object> voteOnEdit(Long editId, String voteType, Long userId) {
        if (!"upvote".equals(voteType) && !"downvote".equals(voteType)) {
            throw new IllegalArgumentException("Vote type must be upvote or downvote.");
        }

        Edit edit = editRepository.findById(editId)
                .orElseThrow(() -> new ResourceNotFoundException("Edit", editId));

        Optional<Vote> existing = voteRepository.findByUserIdAndVotableIdAndVotableType(userId, editId, "edit");

        if (existing.isPresent()) {
            Vote vote = existing.get();
            if (vote.getVoteType().equals(voteType)) {
                voteRepository.delete(vote);
                updateEditVoteCount(edit, voteType, -1);
                return Map.of("action", "removed", "voteType", voteType);
            } else {
                updateEditVoteCount(edit, vote.getVoteType(), -1);
                vote.setVoteType(voteType);
                voteRepository.save(vote);
                updateEditVoteCount(edit, voteType, 1);
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
            updateEditVoteCount(edit, voteType, 1);
            return Map.of("action", "voted", "voteType", voteType);
        }
    }

    private void updateArticleVoteCount(Long articleId, String voteType, int delta) {
        if ("like".equals(voteType)) {
            if (delta > 0) {
                articleRepository.incrementLikeCount(articleId);
            } else {
                articleRepository.decrementLikeCount(articleId);
            }
            return;
        }

        if (delta > 0) {
            articleRepository.incrementDislikeCount(articleId);
        } else {
            articleRepository.decrementDislikeCount(articleId);
        }
    }

    private void updateEditVoteCount(Edit edit, String voteType, int delta) {
        if ("upvote".equals(voteType)) {
            int currentCount = edit.getUpvoteCount() == null ? 0 : edit.getUpvoteCount();
            edit.setUpvoteCount(Math.max(0, currentCount + delta));
        } else {
            int currentCount = edit.getDownvoteCount() == null ? 0 : edit.getDownvoteCount();
            edit.setDownvoteCount(Math.max(0, currentCount + delta));
        }

        editRepository.save(edit);
    }
}
