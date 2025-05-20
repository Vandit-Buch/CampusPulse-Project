package com.vandit.campuspulse.Repositories;

import com.vandit.campuspulse.Entities.AdminActionLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminActionLogRepository extends MongoRepository<AdminActionLog, String> {
    List<AdminActionLog> findByComplaintId(String complaintId);

    List<AdminActionLog> findByAdminEmail(String email);
}
