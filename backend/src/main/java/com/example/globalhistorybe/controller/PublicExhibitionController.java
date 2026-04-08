package com.example.globalhistorybe.controller;

import com.example.globalhistorybe.dto.res.ExhibitionResponse;
import com.example.globalhistorybe.service.ExhibitionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exhibitions")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class PublicExhibitionController {

    private final ExhibitionService exhibitionService;

    @GetMapping
    public ResponseEntity<List<ExhibitionResponse>> getAll() {
        return ResponseEntity.ok(exhibitionService.getAllExhibitions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExhibitionResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(exhibitionService.getExhibitionById(id));
    }
}
