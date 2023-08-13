import { Router } from "../lib";

describe("tests router", () => {
  it("test router functionality", () => {
    const router = new Router();

    router.add("/hello/:id", (params) => {
      console.log("/hello/:id", params);
    });

    router.exec("/hello/25");
  });
});
