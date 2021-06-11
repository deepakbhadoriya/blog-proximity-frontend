/// <reference types="cypress" />
import baseUrl from "../config/baseUrl";

describe("visit homepage and load all post", () => {
  it("Visit Landing Homepage ", () => {
    cy.visit(baseUrl);
    // * add total page accordingly
    const totalPage = 2;
    let currentPage = 1;
    while (currentPage <= totalPage) {
      cy.scrollTo("bottom", { ensureScrollable: true, duration: 2000 });
      cy.wait(1000);
      currentPage++;
    }
    cy.get('[test-data-py="postBottom"]');
    cy.scrollTo("top", { ensureScrollable: true, duration: 2000 });
  });

  it("Visit Fist blog from the list", () => {
    cy.get('[test-data-py="blogPage"]').first().click();
    cy.url().should("include", "/post");
    cy.wait(2000);
  });

  it("Visit all the public page routes", () => {
    cy.get('[test-data-py="visit-login"]').click();
    cy.url().should("include", "/auth/login");
    cy.wait(1000);
    cy.go("back");

    cy.get('[test-data-py="visit-signUp"]').click();
    cy.url().should("include", "/auth/signup");
    cy.wait(1000);
    cy.visit(baseUrl);
  });
});
