/**
 * IF you see smoke, you know there's fire. This file is essentially a high-level testing of all the application.
 */
describe("app", () => {
  it("works", () => {
    cy.visit("/");
    cy.findByRole("button", { name: /About/i }).click({ force: true });
    cy.findAllByText(/KHONGCHAI.G/i).should("exist");
  });
});
