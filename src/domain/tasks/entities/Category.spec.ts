import { Category } from "src/domain/tasks/entities/Category";
import { CategoryName } from "src/domain/tasks/entities/vo/CategoryName";

// vo mock
jest.mock("src/domain/tasks/entities/vo/CategoryName", () => {
  return {
    CategoryName: jest.fn().mockImplementation((value: string) => ({ value })),
  };
});

// test execution
describe("Category", () => {
  it("create normal", async () => {
    const category = Category.create(1, "name");
    expect(CategoryName).toBeCalledTimes(1);
    expect(category.id).toBe(1);
    expect(category.name.value).toBe("name");
  });
});
