import { TaskTitle } from "src/domain/tasks/entities/vo/TaskTitle";

describe("TaskTitle", () => {
  it("validation normal", () => {
    const taskTitle = new TaskTitle("test");
    expect(taskTitle.value).toBe("test");
  });
  it("validation error", () => {
    expect(() => {
      new TaskTitle("");
    }).toThrow("The field is required");
  });
});
