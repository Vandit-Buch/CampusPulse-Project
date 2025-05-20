package com.vandit.campuspulse.Service;


import com.vandit.campuspulse.DTO.ComplaintRequest;
import com.vandit.campuspulse.Entities.Complaint;
import com.vandit.campuspulse.Enums.Status;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Optional;

public interface ComplaintService {
    //*Add a complaint
    public void addComplaint(ComplaintRequest complaintRequest);

    //*Get the complaint by complaint id(Read)
    public Optional<Complaint> getComplaintByComplaintId(String complaintId);

    //*Get all the complaints (For admin)
    public List<Complaint> getAllComplaints();

    //*Get all the complaints of a student using student id
    public List<Complaint> getAllComplaintsOfAStudent(String studentId,String requestingUserName,String role) throws AccessDeniedException;

    //*Update a complaint
    public void updateComplaint(Complaint newComplaint);

    //*Remove a complaint
    public void removeComplaintById(String complaintId);

    //*View the status of complaint
    public Status getStatusOfComplaint(String complaintId);

    //*Change the status
    public void updateStatus(String complaintId, String newStatus);
}
