package com.vandit.campuspulse.Repositories;

import com.vandit.campuspulse.Entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

//*Any repository that extends MongoRepository is of the form<EntityType,IDType>
//*After this, repository provides all the basic CRUD operations on the entities in the database, hence repositories are autowired inside the services.
@Repository
public interface UserRepository extends MongoRepository<User,String> {
    Optional<User> findByUserName(String userName);

    boolean existsByUserName(String userName);

    Optional<User> findByEmail(String email);
}
