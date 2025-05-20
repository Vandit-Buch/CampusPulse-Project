package com.vandit.campuspulse.DTO;

import com.vandit.campuspulse.Entities.User;

public class JwtResponse {
    private String token;
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public JwtResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public JwtResponse(String token, User user) {
        this.token = token;
        this.user = user;
    }
}
