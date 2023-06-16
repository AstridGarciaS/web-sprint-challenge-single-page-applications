describe("unit test", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/pizza")
    })
    
    const specialInput = () => cy.get("instructions > input")
    const submitButton = () => cy.get(".submit")

    it("can type special instructions", () => {
        specialInput()
        .should("have.value", "")
        .type("no pepper")
        .should("have.value", "no pepper")
    })
    it("can add multiple toppings", () => {
        cy.get('input[type = "checkbox"]')
            .check()
            .should('be.checked')
    })
    it("select size", () => {
        cy.get('select')
            .select('large')
            .should('have.value', 'large')
    })
    it("can submit order", () => {
       submitButton()
       .click()
    })
})