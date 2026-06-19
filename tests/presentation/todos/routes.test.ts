import request from "supertest";
import { testServer } from "../../test-server";

describe("Todo routes", () => {
  beforeAll(async () => {
    await testServer.start();
  });

  afterAll(() => {
    testServer.close();
  });

  it("should return TODOS api/todos", async () => {
    const response = await request(testServer.app)
      .get("/api/todos")
      .expect(200);
  });
});
