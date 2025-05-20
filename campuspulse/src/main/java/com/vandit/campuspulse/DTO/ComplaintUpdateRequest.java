package com.vandit.campuspulse.DTO;

public class ComplaintUpdateRequest {
    private String id;
    private String status;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "ComplaintUpdateRequest{" +
                "id='" + id + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
