describe("connect to the test db", () => {
  it("can connect to the db", () => {
    cy.task(
      "queryDb",
      "CREATE TABLE Students (StudentID int, FirstName varchar(255), StudentGroup varchar(255), City varchar(255))"
    );
  });

  it("Input entries", () => {
    cy.task(
      "queryDb",
      `INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES
    (1, "Ivan", "02-2022", "Barcelona"),
    (2, "Maria", "03-2022", "Tokio"),
    (3, "Andrey", "01-2023", "Milan"),
    (4, "Galina", "01-2023", "Moscow"),
    (5, "Irina", "01-2023", "Kazan")`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result.affectedRows).to.equal(5);
    });
  });

  it("select", () => {
    cy.task(
      "queryDb",
      `SELECT FirstName FROM Students WHERE City="Milan"`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result[0].FirstName).to.equal("Andrey");
    });
  });

  it("select", () => {
    cy.task(
      "queryDb",
      `SELECT FirstName FROM Students WHERE StudentGroup="01-2023"`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result[0].FirstName).to.equal("Andrey");
      expect(result[1].FirstName).to.equal("Galina");
      expect(result[2].FirstName).to.equal("Irina");
    });
  });

  it("can delete the db", () => {
    cy.task("queryDb", "DROP TABLE Students");
  });
});
