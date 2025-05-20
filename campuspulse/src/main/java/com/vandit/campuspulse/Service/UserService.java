package com.vandit.campuspulse.Service;

import com.vandit.campuspulse.DTO.RegisterRequest;
import com.vandit.campuspulse.Entities.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    //*Method to create new User
    public void registerUser(RegisterRequest request);

    //*Method to update user credentials
    public void updateUser(User user);

    //*Method to remove a user from the database
    public void removeUser(String id);

    //*Method to get a user by his/her name
    public Optional<User> getUserByUserName(String userName);

    //*Method to check if a user exists or not
    public boolean existsByUserName(String userName);

    //*Method to get All users
    public Optional<List<User>> getAllUsers();
}
