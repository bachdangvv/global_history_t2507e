package com.example.globalhistorybe.service;

import com.example.globalhistorybe.dto.res.NotificationResponse;
import com.example.globalhistorybe.entity.Notification;
import com.example.globalhistorybe.entity.User;
import com.example.globalhistorybe.exception.ResourceNotFoundException;
import com.example.globalhistorybe.repository.NotificationRepository;
import com.example.globalhistorybe.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public List<NotificationResponse> getUserNotifications(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public void markAsRead(Long notificationId, Long userId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification", notificationId));
        if (!notification.getUserId().equals(userId)) {
            throw new IllegalArgumentException("Not your notification");
        }
        notification.setIsRead(true);
        notificationRepository.save(notification);
    }

    public void createNotification(Long userId, Long actorId, Long relatedId,
                                   String relatedType, String title, String message) {
        Notification notification = Notification.builder()
                .userId(userId)
                .actorId(actorId)
                .relatedId(relatedId)
                .relatedType(relatedType)
                .title(title)
                .message(message)
                .build();
        notificationRepository.save(notification);
    }

    private NotificationResponse toResponse(Notification n) {
        String actorName = n.getActorId() != null
                ? userRepository.findById(n.getActorId()).map(User::getUsername).orElse(null)
                : null;

        return NotificationResponse.builder()
                .id(n.getId())
                .actorId(n.getActorId())
                .actorName(actorName)
                .relatedId(n.getRelatedId())
                .relatedType(n.getRelatedType())
                .title(n.getTitle())
                .message(n.getMessage())
                .isRead(n.getIsRead())
                .createdAt(n.getCreatedAt())
                .build();
    }
}
