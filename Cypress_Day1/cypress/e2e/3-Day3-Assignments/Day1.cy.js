describe("Day-1 assignment", () => {
  const baseUrl = "https://opensource-demo.orangehrmlive.com/";
  beforeEach(() => {
    cy.visit(baseUrl);
  });
  it("Home Page load test", () => {
    cy.get("form").should("be.visible");
    cy.get(".orangehrm-login-branding").should("be.visible");
  });
  it("Login UI test", () => {
    cy.get('input[name="username"]').should("be.visible");
    cy.get("input[name=password]").should("be.visible");
    cy.get('button[type="submit"]').should("be.enabled");
  });
  it("Displays error alert on invalid login", () => {
    cy.get('input[name="username"]').type("uyguigiuhiu");
    cy.get('input[name="password"]').type("jhvghjjhbjb");
    cy.get('button[type="submit"]').click();
    cy.get(".oxd-alert-content-text", {timeout:10000}).should("be.visible");
  });
  it("Successful login and Redirection test", () => {
    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();
    cy.url().should("contain", "dashboard");
  });
});
