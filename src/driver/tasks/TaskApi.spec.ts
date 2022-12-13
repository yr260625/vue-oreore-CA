import { AxiosResponse } from "axios";
import { Api } from "src/driver/axiosConfig";
import { TTask } from "src/driver/tasks/interfaces/TaskInfrastructure";
import { TaskApi } from "src/driver/tasks/TaskApi";

// resolved value by axios function
const mockCategories: Partial<AxiosResponse> = {
  data: [
    { id: 1, name: "test1" },
    { id: 1, name: "test3" },
    { id: 1, name: "test4" },
    { id: 2, name: "test5" },
  ],
};
const mockTasks: Partial<AxiosResponse> = {
  data: [
    { id: 1, category: 1, title: "test1", detail: "test1" },
    { id: 2, category: 1, title: "test3", detail: "" },
    { id: 3, category: 1, title: "test4", detail: "" },
    { id: 4, category: 2, title: "test5", detail: "" },
    { id: 5, category: 1, title: "test6", detail: "test3w" },
    { id: 6, category: 3, title: "tttttt", detail: "tatt" },
  ],
};
const mockNewTask: Partial<AxiosResponse> = {
  data: { id: 1, category: 1, title: "test1_upd", detail: "test1_upd" },
};

// axios mock
const axiosGetSpy = jest.spyOn(Api, "get");
const axiosPostSpy = jest.spyOn(Api, "post");
const axiosPutSpy = jest.spyOn(Api, "put");

// test target class
const taskApi = new TaskApi();

// test execution
describe("TaskApi", () => {
  it("findAllCategories normal", async () => {
    axiosGetSpy.mockResolvedValue(mockCategories);
    const res = await taskApi.findAllCategories();
    res.forEach((elm, i) => {
      expect(elm).toEqual(mockCategories.data[i]);
    });
  });

  it("findAll normal", async () => {
    axiosGetSpy.mockResolvedValue(mockTasks);
    const res = await taskApi.findAll();
    res.forEach((elm, i) => {
      expect(elm).toEqual(mockTasks.data[i]);
    });
  });

  it("save normal", async () => {
    axiosPostSpy.mockResolvedValue(mockNewTask);
    const task: TTask = {
      id: 0,
      category: 1,
      title: "test1_upd",
      detail: "test1_upd",
    };
    const res = await taskApi.save(task);
    expect(res).toEqual(mockNewTask.data);
  });

  it("TaskApi update normal", async () => {
    axiosPutSpy.mockResolvedValue(mockNewTask);
    const task: TTask = {
      id: 1,
      category: 1,
      title: "test1_upd",
      detail: "test1_upd",
    };
    const res = await taskApi.update(task);
    expect(res).toEqual(mockNewTask.data);
  });
});
