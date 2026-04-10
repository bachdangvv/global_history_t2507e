package com.example.globalhistorybe.service;

import com.example.globalhistorybe.dto.req.EventRequest;
import com.example.globalhistorybe.dto.res.EventResponse;
import com.example.globalhistorybe.entity.HistoricalEvent;
import com.example.globalhistorybe.entity.User;
import com.example.globalhistorybe.exception.ResourceNotFoundException;
import com.example.globalhistorybe.repository.HistoricalEventRepository;
import com.example.globalhistorybe.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import com.example.globalhistorybe.dto.res.EventDetailResponse;
import com.example.globalhistorybe.dto.res.ArticleResponse;
import com.example.globalhistorybe.entity.EventArticle;
import com.example.globalhistorybe.repository.EventArticleRepository;
import com.example.globalhistorybe.repository.ArticleRepository;
import com.example.globalhistorybe.service.ArticleService;

@Service
@RequiredArgsConstructor
public class EventService {

    private final HistoricalEventRepository eventRepository;
    private final UserRepository userRepository;
    private final EventArticleRepository eventArticleRepository;
    private final ArticleRepository articleRepository;
    private final ArticleService articleService;

    public List<EventResponse> getAllEvents() {
        return eventRepository.findAllByOrderByEventYearAsc()
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public EventResponse getEventById(Long id) {
        HistoricalEvent event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Historical Event", id));
        return toResponse(event);
    }

    @Transactional
    public EventDetailResponse getEventDetailById(Long id) {
        HistoricalEvent event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Historical Event", id));
        eventRepository.incrementViewCount(id);
        
        List<EventArticle> eventArticles = eventArticleRepository.findByEventId(id);
        List<Long> articleIds = eventArticles.stream().map(EventArticle::getArticleId).collect(Collectors.toList());
        
        List<ArticleResponse> articles = articleRepository.findAllById(articleIds).stream()
                .map(articleService::toResponse)
                .collect(Collectors.toList());
        
        EventResponse baseResponse = toResponse(event);
        return EventDetailResponse.builder()
                .id(baseResponse.getId())
                .creatorId(baseResponse.getCreatorId())
                .creatorName(baseResponse.getCreatorName())
                .title(baseResponse.getTitle())
                .slug(baseResponse.getSlug())
                .summary(baseResponse.getSummary())
                .eventYear(baseResponse.getEventYear())
                .eventDate(baseResponse.getEventDate())
                .imageUrl(baseResponse.getImageUrl())
                .viewCount(baseResponse.getViewCount() + 1)
                .createdAt(baseResponse.getCreatedAt())
                .articles(articles)
                .build();
    }

    @Transactional
    public void linkArticle(Long eventId, Long articleId) {
        if (!eventRepository.existsById(eventId)) throw new ResourceNotFoundException("Historical Event", eventId);
        if (!articleRepository.existsById(articleId)) throw new ResourceNotFoundException("Article", articleId);
        
        if (!eventArticleRepository.existsByEventIdAndArticleId(eventId, articleId)) {
            EventArticle ea = EventArticle.builder().eventId(eventId).articleId(articleId).build();
            eventArticleRepository.save(ea);
        }
    }

    @Transactional
    public void unlinkArticle(Long eventId, Long articleId) {
        eventArticleRepository.deleteByEventIdAndArticleId(eventId, articleId);
    }

    @Transactional
    public EventResponse createEvent(EventRequest request, Long userId) {
        HistoricalEvent event = HistoricalEvent.builder()
                .creatorId(userId)
                .title(request.getTitle())
                .summary(request.getSummary())
                .eventYear(request.getEventYear())
                .eventDate(request.getEventDate())
                .imageUrl(request.getImageUrl())
                .build();
        event = eventRepository.save(event);
        return toResponse(event);
    }

    @Transactional
    public EventResponse updateEvent(Long id, EventRequest request) {
        HistoricalEvent event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Historical Event", id));
        event.setTitle(request.getTitle());
        event.setSummary(request.getSummary());
        event.setEventYear(request.getEventYear());
        event.setEventDate(request.getEventDate());
        event.setImageUrl(request.getImageUrl());
        event.setSlug(request.getTitle().toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", ""));
        event = eventRepository.save(event);
        return toResponse(event);
    }

    @Transactional
    public void deleteEvent(Long id) {
        if (!eventRepository.existsById(id)) throw new ResourceNotFoundException("Historical Event", id);
        eventRepository.deleteById(id);
    }

    private EventResponse toResponse(HistoricalEvent e) {
        String creatorName = userRepository.findById(e.getCreatorId())
                .map(User::getUsername).orElse("Unknown");

        return EventResponse.builder()
                .id(e.getId())
                .creatorId(e.getCreatorId())
                .creatorName(creatorName)
                .title(e.getTitle())
                .slug(e.getSlug())
                .summary(e.getSummary())
                .eventYear(e.getEventYear())
                .eventDate(e.getEventDate())
                .imageUrl(e.getImageUrl())
                .viewCount(e.getViewCount())
                .createdAt(e.getCreatedAt())
                .build();
    }
}
