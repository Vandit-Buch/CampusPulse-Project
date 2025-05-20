package com.vandit.campuspulse.Controllers;

import com.vandit.campuspulse.DTO.AssignRequest;
import com.vandit.campuspulse.DTO.ComplaintRequest;
import com.vandit.campuspulse.DTO.ComplaintUpdateRequest;
import com.vandit.campuspulse.Entities.Complaint;
import com.vandit.campuspulse.Entities.User;
import com.vandit.campuspulse.Enums.Status;
import com.vandit.campuspulse.Service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/complaints")
public class ComplaintController {
    @Autowired
    private ComplaintService complaintService;

    //*POST for registering a new complaint
    @PostMapping("/add")
    public ResponseEntity<String> addComplaint(@RequestBody ComplaintRequest complaintRequest) {
        try {
            complaintService.addComplaint(complaintRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body("Complaint filed successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Complaint was not filed. Sorry!");
        }
    }

    //*GET call for getting complaint using an id
    @GetMapping("/{complaintId}")
    public ResponseEntity<?> getComplaintById(@PathVariable String complaintId) {
        Optional<Complaint> complaint = complaintService.getComplaintByComplaintId(complaintId);
        if (complaint.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(complaint);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No such complaint found!");
        }
    }


    //*GET for retrieving complaints filed by a particular student
    @GetMapping("/my")
    public ResponseEntity<?> getComplaintsOfAStudent(Authentication authentication) {
        String userName = authentication.getName();
        String role = authentication.getAuthorities().iterator().next().getAuthority();
        try {
            return ResponseEntity.status(HttpStatus.OK).body(complaintService.getAllComplaintsOfAStudent(userName,userName,role));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    //*PUT call for updating a complaint
    @PutMapping("/update")
    public ResponseEntity<String> updateComplaint(@RequestBody Complaint complaint) {
        try {
            complaintService.updateComplaint(complaint);
            return ResponseEntity.ok("Complaint updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Original complaint not found!");
        }
    }


    //*DELETE call for removing a complaint
    @DeleteMapping("/remove/{complaintId}")
    public ResponseEntity<String> removeComplaint(@PathVariable String complaintId) {
        try {
            complaintService.removeComplaintById(complaintId);
            return ResponseEntity.ok("Complaint removed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Complaint not found!");
        }
    }

    //*GET call for viewing the status of a complaint
    @GetMapping("/status/{complaintId}")
    public ResponseEntity<?> viewStatusOfAComplaint(@PathVariable String complaintId) {
        try {
            return ResponseEntity.ok(complaintService.getStatusOfComplaint(complaintId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Complaint not found!");
        }
    }
}
