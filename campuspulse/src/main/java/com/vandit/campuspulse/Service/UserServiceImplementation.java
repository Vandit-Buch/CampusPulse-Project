package com.vandit.campuspulse.Service;

import com.vandit.campuspulse.DTO.RegisterRequest;
import com.vandit.campuspulse.Entities.User;
import com.vandit.campuspulse.Enums.Roles;
import com.vandit.campuspulse.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImplementation implements  UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    //*Method-1:To create a new User
    public void registerUser(RegisterRequest request){
        User user = new User();
        user.setId(request.getUserName());
        user.setUserName(request.getUserName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setDepartment(request.getDepartment());    
        user.setEmail(request.getEmail());
        user.setRole(Roles.valueOf(
                request.getRole()
        ));
        user.setCreatedAt(LocalDateTime.now());
        userRepository.save(user);
    }

    @Override
    @CacheEvict(value = "users", key = "#user.userName")
    public void updateUser(User user) {
        Optional<User> existingUser = userRepository.findByUserName(user.getUserName());
        if (existingUser.isPresent()) {
            User toUpdate = existingUser.get();//?Note that the get method is used to extract the data type from optional object
            toUpdate.setDepartment(user.getDepartment());
            toUpdate.setEmail(user.getEmail());
            toUpdate.setPassword(user.getPassword());
            toUpdate.setRole(user.getRole());
            toUpdate.setUserName(user.getUserName());
            userRepository.save(toUpdate);
        } else {
            throw new RuntimeException("User not found: " + user.getUserName());
        }
    }

    @Override
    @CacheEvict(value = "users", key = "#studentId")
    public void removeUser(String studentId) {
        userRepository.deleteById(studentId);
    }

    @Override
    @Cacheable(value="user",key = "#userName")
    public Optional<User> getUserByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    @Override
    @Cacheable(value = "userExists", key = "#userName")
    public boolean existsByUserName(String userName) {
        return userRepository.existsByUserName(userName);
    }

    @Override
    public Optional<List<User>> getAllUsers(){
        return Optional.of(userRepository.findAll());
    }
}
