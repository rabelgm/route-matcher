import { Router } from "../lib";

describe("tests router", () => {
  it("test router functionality", () => {
    const router = new Router();

    const handle = jest.fn();

    router.add("/hello/:id", handle);

    router.exec("/hello/25");

    expect(handle).toHaveBeenCalledWith(["25", null]);
  });
});
