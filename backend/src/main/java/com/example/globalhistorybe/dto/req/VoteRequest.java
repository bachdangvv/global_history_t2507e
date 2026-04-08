package com.example.globalhistorybe.dto.req;

import lombok.Data;

@Data
public class VoteRequest {
    private String voteType; // "upvote" or "downvote"
}