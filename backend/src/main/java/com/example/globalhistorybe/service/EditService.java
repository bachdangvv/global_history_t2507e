package com.example.globalhistorybe.service;

import com.example.globalhistorybe.dto.req.EditRequest;
import com.example.globalhistorybe.dto.res.EditResponse;
import com.example.globalhistorybe.entity.Article;
import com.example.globalhistorybe.entity.Edit;
import com.example.globalhistorybe.entity.User;
import com.example.globalhistorybe.exception.ResourceNotFoundException;
import com.example.globalhistorybe.repository.ArticleRepository;
import com.example.globalhistorybe.repository.EditRepository;
import com.example.globalhistorybe.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EditService {

    private final EditRepository editRepository;
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public List<EditResponse> getPendingEdits() {
        return editRepository.findByStatusOrderByCreatedAtDesc("pending")
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<EditResponse> getUserEdits(Long userId) {
        return editRepository.findByEditorIdOrderByCreatedAtDesc(userId)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional
    public EditResponse submitEdit(EditRequest request, Long userId) {
        Edit edit = Edit.builder()
                .editorId(userId)
                .editableId(request.getEditableId())
                .editableType(request.getEditableType() != null ? request.getEditableType() : "article")
                .title(request.getTitle())
                .summary(request.getSummary())
                .content(request.getContent())
                .thumbnail(request.getThumbnail())
                .status("pending")
                .build();

        edit = editRepository.save(edit);

        // Notify admins
        List<User> admins = userRepository.findAll().stream()
                .filter(u -> u.getRole() == User.Role.ADMIN).collect(Collectors.toList());
        String editorName = userRepository.findById(userId).map(User::getUsername).orElse("Unknown");
        for (User admin : admins) {
            notificationService.createNotification(admin.getId(), userId,
                    edit.getId(), "edit",
                    "New edit submitted",
                    editorName + " submitted an edit: " + edit.getTitle());
        }

        return toResponse(edit);
    }

    @Transactional
    public EditResponse approveEdit(Long editId, Long adminId) {
        Edit edit = editRepository.findById(editId)
                .orElseThrow(() -> new ResourceNotFoundException("Edit", editId));

        edit.setStatus("approved");
        edit.setReviewedBy(adminId);
        edit.setReviewedAt(LocalDateTime.now());
        edit = editRepository.save(edit);

        // Apply edit to article if applicable
        if ("article".equals(edit.getEditableType())) {
            Article article = articleRepository.findById(edit.getEditableId()).orElse(null);
            if (article != null) {
                article.setTitle(edit.getTitle());
                article.setSummary(edit.getSummary());
                article.setContent(edit.getContent());
                if (edit.getThumbnail() != null) {
                    article.setImageUrl(edit.getThumbnail());
                }
                article.setCurrentEditId(edit.getId());
                articleRepository.save(article);
            }
        }

        // Notify editor
        notificationService.createNotification(edit.getEditorId(), adminId,
                edit.getId(), "edit",
                "Edit approved",
                "Your edit \"" + edit.getTitle() + "\" has been approved!");

        return toResponse(edit);
    }

    @Transactional
    public EditResponse rejectEdit(Long editId, Long adminId) {
        Edit edit = editRepository.findById(editId)
                .orElseThrow(() -> new ResourceNotFoundException("Edit", editId));

        edit.setStatus("rejected");
        edit.setReviewedBy(adminId);
        edit.setReviewedAt(LocalDateTime.now());
        edit = editRepository.save(edit);

        notificationService.createNotification(edit.getEditorId(), adminId,
                edit.getId(), "edit",
                "Edit rejected",
                "Your edit \"" + edit.getTitle() + "\" has been rejected.");

        return toResponse(edit);
    }

    private EditResponse toResponse(Edit edit) {
        String editorName = userRepository.findById(edit.getEditorId())
                .map(User::getUsername).orElse("Unknown");
        String reviewerName = edit.getReviewedBy() != null
                ? userRepository.findById(edit.getReviewedBy()).map(User::getUsername).orElse(null)
                : null;

        return EditResponse.builder()
                .id(edit.getId())
                .editorId(edit.getEditorId())
                .editorName(editorName)
                .editableId(edit.getEditableId())
                .editableType(edit.getEditableType())
                .title(edit.getTitle())
                .summary(edit.getSummary())
                .content(edit.getContent())
                .thumbnail(edit.getThumbnail())
                .status(edit.getStatus())
                .reviewedBy(edit.getReviewedBy())
                .reviewerName(reviewerName)
                .upvoteCount(edit.getUpvoteCount())
                .downvoteCount(edit.getDownvoteCount())
                .reviewedAt(edit.getReviewedAt())
                .createdAt(edit.getCreatedAt())
                .build();
    }
}
