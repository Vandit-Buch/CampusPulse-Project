package com.vandit.campuspulse.Controllers;

import com.vandit.campuspulse.DTO.JwtRequest;
import com.vandit.campuspulse.DTO.JwtResponse;
import com.vandit.campuspulse.Entities.User;
import com.vandit.campuspulse.Repositories.UserRepository;
import com.vandit.campuspulse.Service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    @Autowired
    private AuthenticationManager authManager;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public JwtResponse login(@RequestBody JwtRequest req) {
        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(req.getUserName(), req.getPassword())
            );

        } catch (AuthenticationException e) {
            return new JwtResponse(null,null);
        }

        Optional<User> user = userRepository.findByUserName(req.getUserName());
        UserDetails ud = userDetailsService.loadUserByUsername(req.getUserName());
        String token = jwtService.generateToken(ud);
        return user.map(value -> new JwtResponse(token, value)).orElseGet(() -> new JwtResponse(token, null));
    }
}
