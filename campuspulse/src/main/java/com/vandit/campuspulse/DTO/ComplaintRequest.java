package com.vandit.campuspulse.DTO;

public class ComplaintRequest {
    private String category;
    private String description;
    private String studentId;

    @Override
    public String toString() {
        return "ComplaintRequest{" +
                "category='" + category + '\'' +
                ", description='" + description + '\'' +
                ", studentId='" + studentId + '\'' +
                ", status='" + status + '\'' +
                '}';
    }

    private String status;

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
