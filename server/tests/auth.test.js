const request = require("supertest");
const app = require("../server");

describe("Auth API", () => {
  it("should return 401 for invalid login", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "fake@example.com", password: "wrongpass" });
    expect(res.statusCode).toEqual(401);
  });
});