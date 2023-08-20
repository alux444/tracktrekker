describe("E2E - Searching for song, getting results", () => {
    it("should visit", () => {
        cy.visit("http://localhost:5173/tracktrekker/");

        cy.contains("Get Started").click();

        //should be at main page
        cy.contains("Songs").click();

        cy.get("#songSearchBar").type("Miracle");

        cy.get("#searchForm").submit();

        cy.get("#searchResults").should("be.visible");

        cy.get("#songDisplay").eq(0).find("#songAddButton").click();

        cy.get("#getResultsButton").should("be.visible");
        cy.get("#getResultsButton").click();

        cy.get("#recommendResults").should("be.visible");
    });
});
