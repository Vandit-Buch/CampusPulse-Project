package com.vandit.campuspulse.Controllers;

import com.vandit.campuspulse.DTO.ComplaintUpdateRequest;
import com.vandit.campuspulse.DTO.StudentRequest;
import com.vandit.campuspulse.Entities.Complaint;
import com.vandit.campuspulse.Service.ComplaintService;
import com.vandit.campuspulse.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminActionLogController {
    @Autowired
    private ComplaintService complaintService;

    @Autowired
    private UserService userService;
    //*Function to get all the complaints
    @GetMapping("/complaints/all")
    public ResponseEntity<List<Complaint>> getAllComplaints() {
        return ResponseEntity.status(HttpStatus.OK).body(complaintService.getAllComplaints());
    }

    //*Function to get all the complaints of a particular student
    @GetMapping("/complaints/student/{studentId}")
    public ResponseEntity<?> getComplaintsOfAStudent(@PathVariable String studentId, Authentication authentication){
        String userName = authentication.getName();
        String role = authentication.getAuthorities().iterator().next().getAuthority();
        try {
            return ResponseEntity.status(HttpStatus.OK).body(complaintService.getAllComplaintsOfAStudent(studentId,userName,role));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    //*GET call for viewing the status of a complaint
    @GetMapping("/complaints/status/{complaintId}")
    public ResponseEntity<?> viewStatusOfAComplaint(@PathVariable String complaintId) {
        try {
            return ResponseEntity.ok(complaintService.getStatusOfComplaint(complaintId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Complaint not found!");
        }
    }

    @PostMapping("/complaints/change")
    public ResponseEntity<String> changeStatusOfAComplaint(@RequestBody ComplaintUpdateRequest complaintUpdateRequest) {
        try {
            System.out.println("Raw Payload : "+complaintUpdateRequest);
            System.out.println(complaintUpdateRequest.getId());
            System.out.println(complaintUpdateRequest.getStatus());
            complaintService.updateStatus(complaintUpdateRequest.getId(),complaintUpdateRequest.getStatus());
            return ResponseEntity.ok("Status updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Complaint not found!");
        }
    }

    @GetMapping("/users/all")
    public ResponseEntity<?> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }
}
