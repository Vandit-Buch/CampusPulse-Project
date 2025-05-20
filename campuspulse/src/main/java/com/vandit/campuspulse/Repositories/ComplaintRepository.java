package com.vandit.campuspulse.Repositories;

import com.vandit.campuspulse.Entities.Complaint;
import com.vandit.campuspulse.Enums.Status;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends MongoRepository<Complaint, String> {
    List<Complaint> findByStudentId(String studentId);
    List<Complaint> findByStatus(Status status);
}
