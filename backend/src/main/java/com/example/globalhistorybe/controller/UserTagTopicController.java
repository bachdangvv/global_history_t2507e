package com.example.globalhistorybe.controller;

import com.example.globalhistorybe.entity.Tag;
import com.example.globalhistorybe.entity.Topic;
import com.example.globalhistorybe.repository.TagRepository;
import com.example.globalhistorybe.repository.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class UserTagTopicController {

    private final TagRepository tagRepository;
    private final TopicRepository topicRepository;

    @PostMapping("/tags")
    public ResponseEntity<Tag> createTag(@RequestBody Tag tag) {
        return ResponseEntity.ok(tagRepository.save(tag));
    }

    @PostMapping("/topics")
    public ResponseEntity<Topic> createTopic(@RequestBody Topic topic) {
        return ResponseEntity.ok(topicRepository.save(topic));
    }
}
