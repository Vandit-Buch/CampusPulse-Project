package com.vandit.campuspulse.Entities;

import com.vandit.campuspulse.Enums.ComplaintCategory;
import com.vandit.campuspulse.Enums.Status;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import com.vandit.campuspulse.Enums.Status.*;

import static com.vandit.campuspulse.Enums.Status.OPEN;

@Document(collection="complaints")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Complaint implements Serializable {
//    @Serial
//    private static final long serialVersionUID = 1L;
    @Id
    private String id; //*id for the complaint


    //*Useful on User side
    private String studentId;
    private ComplaintCategory category;
    private String description;
    private Status status = OPEN;

    //*Useful on Admin side
    private String contextGivenByAdmin;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt;

    public String getContextGivenByAdmin() {
        return contextGivenByAdmin;
    }

    public void setContextGivenByAdmin(String contextGivenByAdmin) {
        this.contextGivenByAdmin = contextGivenByAdmin;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public ComplaintCategory getCategory() {
        return category;
    }

    public void setCategory(ComplaintCategory category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
