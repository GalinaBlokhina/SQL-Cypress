describe("connect to the test db", () => {
  it("can connect to the db", () => {
    cy.task(
      "queryDb",
      "CREATE TABLE Students (StudentID int, FirstName varchar(255), StudentGroup varchar(255), City varchar(255)"
    );
  });
});
