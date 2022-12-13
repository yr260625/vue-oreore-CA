import { Category } from "src/domain/tasks/entities/Category";
import { Task } from "src/domain/tasks/entities/Task";
import { CategoryName } from "src/domain/tasks/entities/vo/CategoryName";
import { TaskDetail } from "src/domain/tasks/entities/vo/TaskDetail";
import { TaskTitle } from "src/domain/tasks/entities/vo/TaskTitle";

// vo constructor mock
jest.mock("src/domain/tasks/entities/vo/TaskTitle", () => {
  return {
    TaskTitle: jest.fn().mockImplementation((value: string) => ({ value })),
  };
});
jest.mock("src/domain/tasks/entities/vo/TaskDetail", () => {
  return {
    TaskDetail: jest.fn().mockImplementation((value: string) => ({ value })),
  };
});
jest.mock("src/domain/tasks/entities/vo/CategoryName", () => {
  return {
    CategoryName: jest.fn().mockImplementation((value: string) => ({ value })),
  };
});

// entity constructor mock
jest.mock("src/domain/tasks/entities/Category", () => {
  return {
    Category: jest
      .fn()
      .mockImplementation((id: number, name: CategoryName) => ({ id, name })),
  };
});

// test execution
describe("Task", () => {
  it("create normal", async () => {
    const task = Task.create(1, 2, "title", "detail");
    expect(TaskDetail).toBeCalledTimes(1);
    expect(TaskTitle).toBeCalledTimes(1);
    expect(Category).toBeCalledTimes(1);
    expect(CategoryName).toBeCalledTimes(1);
    expect(task.id).toBe(1);
    expect(task.category.id).toBe(2);
    expect(task.title.value).toBe("title");
    expect(task.detail.value).toBe("detail");
  });
});
