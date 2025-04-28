describe("Profile Update Integration Test", () => {
  it("should update the username successfully", () => {
    // Visit the profile page
    cy.visit("http://localhost:3000/profile");

    // Click on "Change Username"
    cy.contains("Change Username").click();

    // Enter a new username
    cy.get('input[name="username"]').type("newUsername");

    // Submit the form
    cy.contains("Update Username").click();

    // Verify the success message
    cy.contains("Profile updated successfully!").should("be.visible");

    // Verify the backend call (requires Cypress intercept)
    cy.intercept("POST", "http://localhost:8080/auth/update-profile").as("updateProfile");
    cy.wait("@updateProfile").its("response.statusCode").should("eq", 200);
  });
});