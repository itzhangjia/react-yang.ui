import classes from "../classes";
describe("classes", () => {
  it("接受一个 className", () => {
    const result = classes("a");
    expect(result).toEqual("a");
  });
  it("接受个 className", () => {
    const result = classes("a","b");
    expect(result).toEqual("a b");
  });
});