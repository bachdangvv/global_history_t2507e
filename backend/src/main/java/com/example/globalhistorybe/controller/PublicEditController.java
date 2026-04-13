package com.example.globalhistorybe.controller;

import com.example.globalhistorybe.dto.res.EditResponse;
import com.example.globalhistorybe.service.EditService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/edits")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class PublicEditController {

    private final EditService editService;

    @GetMapping("/{id}")
    public ResponseEntity<EditResponse> getEdit(@PathVariable Long id) {
        return ResponseEntity.ok(editService.getEditById(id));
    }

    @GetMapping("/recent")
    public ResponseEntity<List<EditResponse>> getRecentEdits() {
        return ResponseEntity.ok(editService.getRecentEdits());
    }
}
