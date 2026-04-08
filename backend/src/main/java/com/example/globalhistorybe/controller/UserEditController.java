package com.example.globalhistorybe.controller;

import com.example.globalhistorybe.dto.req.EditRequest;
import com.example.globalhistorybe.dto.res.EditResponse;
import com.example.globalhistorybe.dto.req.VoteRequest;
import com.example.globalhistorybe.entity.User;
import com.example.globalhistorybe.repository.UserRepository;
import com.example.globalhistorybe.service.EditService;
import com.example.globalhistorybe.service.VoteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class UserEditController {

    private final EditService editService;
    private final VoteService voteService;
    private final UserRepository userRepository;

    @PostMapping("/edits")
    public ResponseEntity<EditResponse> submitEdit(@Valid @RequestBody EditRequest request) {
        return ResponseEntity.ok(editService.submitEdit(request, getCurrentUserId()));
    }

    @GetMapping("/my/edits")
    public ResponseEntity<List<EditResponse>> myEdits() {
        return ResponseEntity.ok(editService.getUserEdits(getCurrentUserId()));
    }

    @PostMapping("/edits/{id}/vote")
    public ResponseEntity<Map<String, Object>> voteOnEdit(@PathVariable Long id,
                                                          @RequestBody VoteRequest request) {
        return ResponseEntity.ok(voteService.voteOnEdit(id, request.getVoteType(), getCurrentUserId()));
    }

    private Long getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return userRepository.findByEmail(email).map(User::getId).orElseThrow();
    }
}
