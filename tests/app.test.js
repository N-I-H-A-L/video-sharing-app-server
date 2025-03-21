import request from "supertest";
import app from "../server.js";
import mongoose from "mongoose";

let server;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  server = app.listen(5001);
});

afterAll(async () => {
  if (server) {
    await new Promise((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
  }

  await mongoose.connection.close();
  await mongoose.disconnect();
});

describe("Root Route", () => {
  it("should return 200 and a message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Server is up and running!");
  });
});