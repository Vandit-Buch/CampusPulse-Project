package com.vandit.campuspulse.Service;

import com.vandit.campuspulse.Entities.User;
import com.vandit.campuspulse.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository; // your MongoDB repository

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        // 1. Find user from DB using email (username in our case)
        Optional<User> userOptional = userRepository.findByUserName(userName);

        // 2. If user not found, throw exception
        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("User not found with userName: " + userName);
        }

        User user = userOptional.get();
        System.out.println("✅ User found: " + user.getUserName());
        System.out.println("🔐 Stored hashed password: " + user.getPassword());
        System.out.println("🎭 Role: " + user.getRole());

        // 3. Convert your User object to Spring Security's UserDetails
        return new org.springframework.security.core.userdetails.User(
                user.getUserName(), // username
                user.getPassword(), // hashed password
                Collections.singleton(new SimpleGrantedAuthority("ROLE_"+user.getRole().name()))// authority (for now, simple USER role)

        );
    }
}
