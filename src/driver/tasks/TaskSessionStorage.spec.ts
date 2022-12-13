/**
 * @jest-environment jsdom
 */
import {
  ITaskInfrastructure,
  TTask,
} from "src/driver/tasks/interfaces/TaskInfrastructure";
import { TaskSessionStorage } from "src/driver/tasks/TaskSessionStorage";

// session storage mock
const sessionStorageMock = (() => {
  let store: {
    [key: string]: string;
  } = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
  };
})();
Object.defineProperty(window, "sessionStorage", {
  value: sessionStorageMock,
});

// initial storage
const mockTasks = [
  { id: 0, category: 1, title: "test1", detail: "" },
  { id: 1, category: 1, title: "test2", detail: "" },
  { id: 2, category: 2, title: "test3", detail: "" },
  { id: 3, category: 3, title: "test4", detail: "" },
];

// initialize storage after each tests
let taskApi: ITaskInfrastructure;
beforeEach(() => {
  sessionStorageMock.setItem("tasks", JSON.stringify(mockTasks));
  taskApi = new TaskSessionStorage();
});

// test execution
describe("TaskSessionStorage", () => {
  it("findAll normal", async () => {
    const taskApi = new TaskSessionStorage();
    const res = await taskApi.findAll();
    res.forEach((elm, i) => {
      expect(elm).toEqual(mockTasks[i]);
    });
  });

  it("addTask normal", async () => {
    const addTask: TTask = {
      id: 0,
      category: 1,
      title: "addTaskTitle_1",
      detail: "addTaskDetail_1",
    };
    const expectedNewTask = { ...addTask, id: mockTasks.length };
    const newTask = await taskApi.save(addTask);
    const tasks = await taskApi.findAll();
    expect(newTask).toEqual(expectedNewTask);
    expect(tasks.length).toBe(mockTasks.length + 1);
    expect(tasks.slice(-1)[0]).toEqual(newTask);
  });

  it("update normal", async () => {
    const task: TTask = {
      id: 2,
      category: 3,
      title: "updTaskTitle_2",
      detail: "updTaskDetail_2",
    };
    const newTask = await taskApi.update(task);
    const tasks = await taskApi.findAll();
    expect(newTask).toEqual(task);
    expect(tasks.length).toEqual(mockTasks.length);
  });

  it("deleteById normal", async () => {
    const oldTasks = await taskApi.findAll();
    await taskApi.deleteById(1);
    const tasks = await taskApi.findAll();
    expect(tasks).toEqual(oldTasks.filter((elm) => elm.id !== 1));
  });
});
