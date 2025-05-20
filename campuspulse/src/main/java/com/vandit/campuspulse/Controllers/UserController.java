package com.vandit.campuspulse.Controllers;

import com.vandit.campuspulse.DTO.RegisterRequest;
import com.vandit.campuspulse.Entities.User;
import com.vandit.campuspulse.Service.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;


    //*POST call for registration of users
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterRequest request){
        try {
            userService.registerUser(request);
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed");
        }
    }

    //*GET call for getting user by userName
    @GetMapping("/{userName}")
    public ResponseEntity<?> getUserByUserName(@PathVariable String userName){
        Optional<User> userByUserName = userService.getUserByUserName(userName);
        if(userByUserName.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(userByUserName);
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No such user found!");
        }
    }

    //*GET call for checking if user with userName exists or not
    @GetMapping("/exists/{userName}")
    public ResponseEntity<Boolean> existsByUserName(@PathVariable String userName){
        boolean exists = userService.existsByUserName(userName);
        return ResponseEntity.ok(exists);
    }

    //*PUT for updating the user
    @PutMapping("/update")
    public ResponseEntity<String> updateUser(@RequestBody User user){
        try {
            userService.updateUser(user);
            return ResponseEntity.ok("User updated successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    //*DELETE call for removing user
    @DeleteMapping("/remove/{id}")
    public ResponseEntity<String> removeUser(@PathVariable String id){
        try {
            userService.removeUser(id);
            return ResponseEntity.ok("User removed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
}
