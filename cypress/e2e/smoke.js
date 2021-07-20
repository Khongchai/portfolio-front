describe("app", () => {
  it("works", () => {
    cy.visit("/");
    cy.findByRole("button", { name: /About/i }).click({ force: true });
    cy.findAllByText(/KHONGCHAI.G/i).should("exist");
  });
});

describe("Test Projects page.", () => {
  it("Ensure that the children of project-selectors and project-events are the same.", () => {
    cy.visit("/projects");
    cy.get("[data-cy=project-as-timeline-event]").then((events) => {
      cy.get("[data-cy=project-item]").then((items) => {
        expect(events.length).to.equal(items.length);
      });
    });
  });
});

// describe("Test about page", () => {
//   it(`Ensures not duplications in the tech-container area, as
//   it pulls out everything together, an array filter should catch this`, () => {
//     cy.visit("about");
//     cy.get("[data-cy=logo-container").then((containers) => {
//       containers.map((container) => {
//         console.log(container);
//       });
//     });
//   });
// });
