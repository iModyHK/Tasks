const request = require("supertest");
const app = require("../server");

describe("Tasks API", () => {
  it("should return an array of tasks", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});