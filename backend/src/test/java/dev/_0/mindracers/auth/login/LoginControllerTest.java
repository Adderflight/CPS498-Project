package dev._0.mindracers.auth.login;

import dev._0.mindracers.user.User;
import dev._0.mindracers.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class LoginControllerTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private LoginController loginController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testUpdateProfile_ValidUsername() {
        // Arrange
        int userID = 1;
        String newUsername = "newUsername";
        User user = new User();
        user.setId(userID);
        user.setUsername("oldUsername");

        when(userRepository.findById(userID)).thenReturn(Optional.of(user));

        // Act
        ResponseEntity<String> response = loginController.updateProfile(userID, newUsername, null, null);

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Profile updated successfully!", response.getBody());
        assertEquals(newUsername, user.getUsername());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testUpdateProfile_ValidEmail() {
        // Arrange
        int userID = 1;
        String newEmail = "newemail@example.com";
        User user = new User();
        user.setId(userID);
        user.setEmail("oldemail@example.com");

        when(userRepository.findById(userID)).thenReturn(Optional.of(user));

        // Act
        ResponseEntity<String> response = loginController.updateProfile(userID, null, newEmail, null);

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Profile updated successfully!", response.getBody());
        assertEquals(newEmail, user.getEmail());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testUpdateProfile_ValidPassword() {
        // Arrange
        int userID = 1;
        String newPassword = "newPassword123";
        User user = new User();
        user.setId(userID);
        user.setPassword("oldPassword");

        when(userRepository.findById(userID)).thenReturn(Optional.of(user));

        // Act
        ResponseEntity<String> response = loginController.updateProfile(userID, null, null, newPassword);

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Profile updated successfully!", response.getBody());
        assertEquals(newPassword, user.getPassword());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testUpdateProfile_UserNotFound() {
        // Arrange
        int userID = 1;

        when(userRepository.findById(userID)).thenReturn(Optional.empty());

        // Act
        ResponseEntity<String> response = loginController.updateProfile(userID, "newUsername", null, null);

        // Assert
        assertEquals(400, response.getStatusCodeValue());
        assertEquals("User not found!", response.getBody());
        verify(userRepository, never()).save(any());
    }

    @Test
    void testUpdateProfile_InvalidEmail() {
        // Arrange
        int userID = 1;
        String invalidEmail = "invalid-email";
        User user = new User();
        user.setId(userID);
        user.setEmail("oldemail@example.com");

        when(userRepository.findById(userID)).thenReturn(Optional.of(user));

        // Act
        ResponseEntity<String> response = loginController.updateProfile(userID, null, invalidEmail, null);

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Profile updated successfully!", response.getBody());
        assertEquals("oldemail@example.com", user.getEmail()); // Email should not change
        verify(userRepository, times(1)).save(user);
    }
}