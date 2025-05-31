/// <reference types="cypress" />

describe("Payment Page Tests", () => {
  beforeEach(() => {
    cy.visit("https://demo.guru99.com/payment-gateway/index.php");
    cy.get('input[type="submit"]').click();
  });

  it("Page Load & UI Verification", () => {
    cy.get(".6u font").last().should("be.visible").and("have.value.gt", 0);
    cy.get('input[name="card_nmuber"]').should("exist").and("be.enabled");
    cy.get('select[name="month"]').should("exist").and("be.enabled");
    cy.get('select[name="year"]').should("exist").and("be.enabled");
    cy.get('input[name="cvv_code"]').should("exist").and("be.enabled");
    cy.get('input[type="submit"]').should("be.visible").and("be.enabled");
  });

  it("should successfully process a valid payment", () => {
    cy.get('input[name="card_nmuber"]').type("4111111111111111");
    cy.get('select[name="month"]').select("12");
    cy.get('select[name="year"]').select("2027");
    cy.get('input[name="cvv_code"]').type("123");
    cy.get('input[type="submit"]').click();

    cy.url().should("include", "genearte_orderid");
    cy.get("td").first().should("be.visible").and("contain", "Order ID");
  });

  it("should show errors for empty fields", () => {
    cy.get('input[type="submit"]').click();
    cy.url().should("include", "payment-gateway");
  });

  it("should reject invalid card numbers", () => {
    cy.get('input[name="card_nmuber"]').type("6767676");
    cy.get('select[name="month"]').select("12");
    cy.get('select[name="year"]').select("2027");
    cy.get('input[name="cvv_code"]').type("123");
    cy.get('input[type="submit"]').click();

    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal("Check card number is 16 digits!");
    });
  });

  it("should reject expired cards", () => {
    cy.get('input[name="card_nmuber"]').type("4111111111111111");
    cy.get('select[name="month"]').select("01");
    cy.get('select[name="year"]').select("2020");
    cy.get('input[name="cvv_code"]').type("123");
    cy.get('input[type="submit"]').click();

    cy.contains("Card expired").should("be.visible");
  });

  it("should reject invalid CVVs", () => {
    cy.get('input[name="card_nmuber"]').type("4111111111111111");
    cy.get('select[name="month"]').select("12");
    cy.get('select[name="year"]').select("2027");
    cy.get('input[name="cvv_code"]').type("12");
    cy.get('input[type="submit"]').click();

    cy.contains("Invalid CVV").should("be.visible");
  });
});
