describe("E2E - Searching for song, getting results", () => {
    it("should visit", () => {
        cy.visit("http://localhost:5173/tracktrekker/");

        cy.contains("Get Started").click();

        //select a song
        cy.get("#getResultsButton").should("not.exist");
        cy.contains("Songs").click();
        cy.get("#askForSongs").should("be.visible");
        cy.get("#songSearchBar").type("Miracle");
        cy.get("#searchForm").submit();
        cy.get("#searchResults").should("be.visible");
        cy.get(".songDisplay").eq(0).find("#songAddButton").click();
        cy.get(".songDisplay").eq(1).find("#songAddButton").click();
        cy.get(".songDisplay").eq(0).find("#songRemoveButton").click();
        cy.contains("Your Search");
        cy.contains("1 song");

        cy.get("#getResultsButton").should("be.visible");

        //select an artist
        cy.contains("Artists").click();
        cy.get("#askForSongs").should("not.exist");
        cy.get("#askForArtists").should("be.visible");
        cy.get("#artistSearchBar").type("keshi");
        cy.get("#searchForm").submit();
        cy.get("#searchResults").should("be.visible");
        cy.get(".artistDisplay").eq(0).find("#artistAddButton").click();
        cy.get(".artistDisplay").eq(1).find("#artistAddButton").click();
        cy.get(".artistDisplay").eq(0).find("#artistRemoveButton").click();
        cy.contains("1 artist");

        //select a genre
        cy.contains("Genres").click();
        cy.get("#askForArtists").should("not.exist");
        cy.get("#askForGenres").should("be.visible");
        cy.get(".selectOptionButton").eq(0).click();
        cy.get("#genresMultiselect").click();
        cy.get(".selectOptionButton").eq(5).click();
        cy.get(".deleteOptionButton").eq(0).click();
        cy.get("#genresMultiselect").click();
        cy.get(".selectOptionButton").eq(3).click();
        cy.contains("2 genres");

        cy.get("#getResultsButton").click();
        cy.get("#recommendResults").should("be.visible");
    });
});
