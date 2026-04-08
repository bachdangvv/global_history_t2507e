package com.example.globalhistorybe.service;

import com.example.globalhistorybe.dto.req.ExhibitionRequest;
import com.example.globalhistorybe.dto.res.ExhibitionResponse;
import com.example.globalhistorybe.entity.Exhibition;
import com.example.globalhistorybe.exception.ResourceNotFoundException;
import com.example.globalhistorybe.repository.ExhibitionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExhibitionService {

    private final ExhibitionRepository exhibitionRepository;

    public List<ExhibitionResponse> getAllExhibitions() {
        return exhibitionRepository.findAllByOrderByStartDateDesc()
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional
    public ExhibitionResponse getExhibitionById(Long id) {
        Exhibition exhibition = exhibitionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exhibition", id));
        exhibitionRepository.incrementViewCount(id);
        return toResponse(exhibition);
    }

    @Transactional
    public ExhibitionResponse createExhibition(ExhibitionRequest request, Long userId) {
        Exhibition exhibition = Exhibition.builder()
                .createdBy(userId)
                .title(request.getTitle())
                .description(request.getDescription())
                .imageUrl(request.getImageUrl())
                .location(request.getLocation())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .status(request.getStatus() != null ? request.getStatus() : "upcoming")
                .build();
        exhibition = exhibitionRepository.save(exhibition);
        return toResponse(exhibition);
    }

    @Transactional
    public ExhibitionResponse updateExhibition(Long id, ExhibitionRequest request) {
        Exhibition exhibition = exhibitionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exhibition", id));
        exhibition.setTitle(request.getTitle());
        exhibition.setDescription(request.getDescription());
        exhibition.setImageUrl(request.getImageUrl());
        exhibition.setLocation(request.getLocation());
        exhibition.setStartDate(request.getStartDate());
        exhibition.setEndDate(request.getEndDate());
        if (request.getStatus() != null) exhibition.setStatus(request.getStatus());
        exhibition.setSlug(request.getTitle().toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", ""));
        exhibition = exhibitionRepository.save(exhibition);
        return toResponse(exhibition);
    }

    @Transactional
    public void deleteExhibition(Long id) {
        if (!exhibitionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Exhibition", id);
        }
        exhibitionRepository.deleteById(id);
    }

    private ExhibitionResponse toResponse(Exhibition e) {
        return ExhibitionResponse.builder()
                .id(e.getId())
                .title(e.getTitle())
                .slug(e.getSlug())
                .description(e.getDescription())
                .imageUrl(e.getImageUrl())
                .location(e.getLocation())
                .startDate(e.getStartDate())
                .endDate(e.getEndDate())
                .status(e.getStatus())
                .viewCount(e.getViewCount())
                .createdAt(e.getCreatedAt())
                .updatedAt(e.getUpdatedAt())
                .build();
    }
}
