package com.example.globalhistorybe.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Set;
import java.util.UUID;

@Service
public class ArticleImageStorageService {

    private static final long MAX_FILE_SIZE = 5L * 1024L * 1024L;
    private static final Set<String> ALLOWED_CONTENT_TYPES = Set.of(
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif"
    );

    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    public String storeImage(MultipartFile file) {
        validateImage(file);

        try {
            Path articleDirectory = resolveBaseDirectory().resolve("articles").normalize();
            Files.createDirectories(articleDirectory);

            String extension = resolveExtension(file);
            String filename = "article-" + UUID.randomUUID() + extension;
            Path target = articleDirectory.resolve(filename).normalize();

            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
            return "/uploads/articles/" + filename;
        } catch (IOException exception) {
            throw new IllegalStateException("Unable to store article image.", exception);
        }
    }

    private void validateImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Please choose an image file.");
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType.toLowerCase())) {
            throw new IllegalArgumentException("Only JPG, PNG, WEBP, and GIF images are supported.");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("Image files must be 5MB or smaller.");
        }
    }

    private Path resolveBaseDirectory() {
        return Paths.get(uploadDir).toAbsolutePath().normalize();
    }

    private String resolveExtension(MultipartFile file) {
        String originalName = StringUtils.cleanPath(file.getOriginalFilename() == null ? "" : file.getOriginalFilename());
        int extensionIndex = originalName.lastIndexOf('.');

        if (extensionIndex >= 0) {
            return originalName.substring(extensionIndex);
        }

        return switch (file.getContentType()) {
            case "image/png" -> ".png";
            case "image/webp" -> ".webp";
            case "image/gif" -> ".gif";
            default -> ".jpg";
        };
    }
}
