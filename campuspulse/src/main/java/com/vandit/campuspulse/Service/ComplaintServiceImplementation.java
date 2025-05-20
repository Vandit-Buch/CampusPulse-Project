package com.vandit.campuspulse.Service;

import com.vandit.campuspulse.DTO.ComplaintRequest;
import com.vandit.campuspulse.Entities.Complaint;
import com.vandit.campuspulse.Enums.ComplaintCategory;
import com.vandit.campuspulse.Enums.Status;
import com.vandit.campuspulse.Repositories.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
public class ComplaintServiceImplementation implements ComplaintService {
    @Autowired
    ComplaintRepository complaintRepository;

    @Override
    public void addComplaint(ComplaintRequest complaintRequest) {
        System.out.println(complaintRequest);
        Complaint complaint = new Complaint();
        complaint.setStatus(Status.valueOf(complaintRequest.getStatus()));
        complaint.setCategory(ComplaintCategory.valueOf(complaintRequest.getCategory()));
        complaint.setStudentId(complaintRequest.getStudentId());
        complaint.setDescription(complaintRequest.getDescription());
        complaint.setCreatedAt(LocalDateTime.now());
        complaint.setUpdatedAt(null);
        complaint.setId(UUID.randomUUID().toString());
        complaintRepository.save(complaint);

    }

    @Override
    //*Cache name = "complaints" key = "id"
    @Cacheable(value = "complaints", key = "#complaintId")
    public Optional<Complaint> getComplaintByComplaintId(String complaintId) {
        return complaintRepository.findById(complaintId);
    }

    @Override
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    @Override
    @Cacheable(value = "allComplaints")
    public List<Complaint> getAllComplaintsOfAStudent(String studentId, String requestingUserName, String role) throws AccessDeniedException {
        if (role.equals("ROLE_ADMIN")) {
            // Admin can see any student's complaints
            return complaintRepository.findByStudentId(studentId);
        } else if (role.equals("ROLE_STUDENT")) {
            if (!studentId.equals(requestingUserName)) {
                throw new AccessDeniedException("Users can only view their own complaints.");
            }
            return complaintRepository.findByStudentId(studentId);
        } else {
            throw new AccessDeniedException("Invalid role");
        }
    }


    @Override
    @CacheEvict(value = "complaints", key = "#newComplaint.id")
    public void updateComplaint(Complaint newComplaint) {
        Optional<Complaint> oldComplaint = complaintRepository.findById(newComplaint.getId());
        if(oldComplaint.isPresent()){
            Complaint old = oldComplaint.get();
            old.setUpdatedAt(LocalDateTime.now());
            old.setCategory(newComplaint.getCategory());
            old.setDescription(newComplaint.getDescription());
            old.setStatus(newComplaint.getStatus());
            old.setStudentId(newComplaint.getStudentId());
            complaintRepository.save(old);
        }else{
            throw new RuntimeException("Complaint not found: " + newComplaint.getDescription());
        }
    }

    @Override
    @CacheEvict(value = "complaints", key = "#complaintId")
    public void removeComplaintById(String complaintId) {
        if(complaintRepository.existsById(complaintId)) {
            complaintRepository.deleteById(complaintId);
        }else{
            throw new RuntimeException("Complaint not found!");
        }
    }

    @Override
    public Status getStatusOfComplaint(String complaintId) {
        return complaintRepository.findById(complaintId)
                .map(Complaint::getStatus)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
    }

    @Override
    @CacheEvict(value = "complaints", key = "#complaintId")
    public void updateStatus(String complaintId, String newStatus) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
        complaint.setStatus(Status.valueOf(newStatus));
        complaint.setUpdatedAt(LocalDateTime.now());
        complaintRepository.save(complaint);
    }

    // (Optional) Evict list cache when any change happens
    @Caching(evict = {
            @CacheEvict(value = "allComplaints", allEntries = true),
            @CacheEvict(value = "complaints", allEntries = true)
    })
    public void evictAllCaches() {
        // call this after add, update, remove, etc.
    }
}
