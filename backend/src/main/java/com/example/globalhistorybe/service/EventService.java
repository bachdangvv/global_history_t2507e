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

@Service
@RequiredArgsConstructor
public class EventService {

    private final HistoricalEventRepository eventRepository;
    private final UserRepository userRepository;

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
