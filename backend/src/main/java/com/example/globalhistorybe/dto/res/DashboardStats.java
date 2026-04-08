package com.example.globalhistorybe.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class DashboardStats {
    private long totalArticles;
    private long publishedArticles;
    private long pendingReviewArticles;
    private long draftArticles;
    private long totalUsers;
    private long totalComments;
    private long pendingEdits;
    private long totalEvents;
    private long totalExhibitions;
    private long totalAuthors;
    private long totalBooks;
    private long totalTopics;
    private long totalTags;
}
