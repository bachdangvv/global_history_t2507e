package com.example.globalhistorybe.repository;

import com.example.globalhistorybe.entity.Edit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EditRepository extends JpaRepository<Edit, Long> {
    List<Edit> findByStatusOrderByCreatedAtDesc(String status);
    List<Edit> findByEditorIdOrderByCreatedAtDesc(Long editorId);
    List<Edit> findByEditableIdAndEditableTypeOrderByCreatedAtDesc(Long editableId, String editableType);
    long countByStatus(String status);
}
