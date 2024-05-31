import { missions } from "../../../src/data";

describe("Render the catalogue list on landing page", () => {
  it("should visit the landing page", () => {
    cy.visit("/");
  });

  it("should render the table with one row per mission", () => {
    cy.visit("/");
    cy.get(".MuiDataGrid-root")
      .find(".MuiDataGrid-row")
      .should("have.length", missions.length);
  });
});

describe("Create a new mission", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="create-mission"]').click();
  });

  it("should navigate to the create view and show empty fields", () => {
    cy.get('input[name="name"]').should("have.value", "");
    cy.get('input[name="destination"]').should("have.value", "");
  });

  it("should add and remove a new member row when clicking on 'add member'", () => {
    cy.get('[data-cy="add-member"]').click();
    cy.get(".mission-members").find(".member").should("have.length", 1);
    cy.get(".mission-members").find(".member").first().find("button").click();
    cy.get(".mission-members").find(".member").should("have.length", 0);
  });

  it("should create a new mission and call the save method", () => {
    cy.get('input[name="name"]').type("Mission name");
    cy.get('input[name="destination"]').type("Destination");

    // add pilot
    cy.get('[data-cy="add-member"]').click();
    cy.get(".mission-members")
      .find(".member")
      .first()
      .find('input[name="experience"]')
      .clear()
      .type("30");
    cy.get('[data-cy="add-member"]').click();

    // add passenger
    cy.get(".mission-members")
      .find(".member")
      .eq(1)
      .find('[data-cy="job-select"]')
      .click()
      .get('ul > li[data-value="Passenger"]')
      .click();

    cy.get('[data-cy="save-mission"]').click();
    cy.get(".MuiDataGrid-root")
      .find(".MuiDataGrid-row")
      .should("have.length", missions.length + 1);
  });
});

describe("Field validation when creating a new mission", () => {
  it("should show a error message when name is missing and prevent saving", () => {
    cy.visit("/");
    cy.get('[data-cy="create-mission"]').click();
    cy.get('input[name="name"]').should("have.value", "");

    cy.get('[data-cy="save-mission"]').click();
    cy.get("#name-helper-text").should("be.visible");

    cy.visit("/");
    cy.get(".MuiDataGrid-root")
      .find(".MuiDataGrid-row")
      .should("have.length", missions.length);
  });
});
