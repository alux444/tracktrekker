context("Window", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/tracktrekker/");
    });

    it("cy.title() - get the title", () => {
        // https://on.cypress.io/title
        cy.title().should("include", "TrackTrekker");
    });
});
