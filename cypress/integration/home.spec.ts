context('Get a Ref Home', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('display a title', function () {
    cy.get('main h1').contains('Welcome');
  });
});
