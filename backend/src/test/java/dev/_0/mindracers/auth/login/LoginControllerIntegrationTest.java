package dev._0.mindracers.auth.login;

import dev._0.mindracers.user.User;
import dev._0.mindracers.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class LoginControllerIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        // Clear the database and add a test user
        userRepository.deleteAll();
        User user = new User();
        user.setId(1);
        user.setUsername("testUser");
        user.setEmail("test@example.com");
        user.setPassword("password123");
        userRepository.save(user);
    }

    @Test
    void testUpdateProfile_Integration() {
        // Prepare the request
        String url = "/auth/update-profile?userID=1&username=newUsername&email=newemail@example.com&password=newPassword123";

        // Send the request
        ResponseEntity<String> response = restTemplate.postForEntity(url, null, String.class);

        // Assert the response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Profile updated successfully!", response.getBody());

        // Verify the database changes
        User updatedUser = userRepository.findById(1).orElseThrow();
        assertEquals("newUsername", updatedUser.getUsername());
        assertEquals("newemail@example.com", updatedUser.getEmail());
        assertEquals("newPassword123", updatedUser.getPassword());
    }
}