package com.example.globalhistorybe.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventArticleId implements Serializable {
    private Long eventId;
    private Long articleId;
}
