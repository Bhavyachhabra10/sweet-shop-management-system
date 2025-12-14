import request from "supertest";
import app from "../index";

describe("Health check API", () => {
  it("should return server running message", async () => {
    const res = await request(app).get("/health");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Server is running");
  });
});

describe("Sweet Inventory API", () => {
  it("should add a sweet to inventory", async () => {
    const res = await request(app)
      .post("/sweets")
      .send({
        name: "Ladoo",
        price: 10,
        quantity: 50,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Ladoo");
    expect(res.body.quantity).toBe(50);
  });
});

it("should return list of sweets", async () => {
  const res = await request(app).get("/sweets");

  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBeGreaterThan(0);
});

it("should fail when required sweet fields are missing", async () => {
  const res = await request(app)
    .post("/sweets")
    .send({
      name: "Barfi"
      // price & quantity missing
    });

  expect(res.statusCode).toBe(400);
});

it("should return all sweets", async () => {
  const res = await request(app).get("/sweets");

  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

it("should delete a sweet from inventory", async () => {
  const res = await request(app).delete("/sweets/0");

  expect(res.statusCode).toBe(200);
  expect(res.body.message).toBe("Sweet deleted");
});
