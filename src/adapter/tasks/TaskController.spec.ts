import { TaskController } from "src/adapter/tasks/TaskController";
import { ITaskUsecase } from "src/domain/tasks/interface/TaskUsecase";
import { TaskInputData } from "src/domain/tasks/TaskInputData";

// DTO mock
jest.mock("src/domain/tasks/TaskInputData", () => {
  return {
    TaskInputData: jest
      .fn()
      .mockImplementation(
        (id: number, categoryId: number, title: string, detail: string) => {
          return { id, categoryId, title, detail };
        }
      ),
  };
});

// usecase mock
const useMockUsecase = () => {
  const init = jest.fn().mockResolvedValue(undefined);
  const addTask = jest.fn().mockResolvedValue(undefined);
  const updateTask = jest.fn().mockResolvedValue(undefined);
  const deleteTask = jest.fn().mockResolvedValue(undefined);

  const mockUsecase = jest.fn<ITaskUsecase, []>().mockImplementation(() => ({
    init,
    addTask,
    updateTask,
    deleteTask,
  }));

  return {
    mockUsecase,
    init,
    addTask,
    updateTask,
    deleteTask,
  };
};

// DI
const usecase = useMockUsecase();
const controller = new TaskController(usecase.mockUsecase());

// test execution
describe("TaskController", () => {
  it("init normal", async () => {
    controller.init();
    expect(usecase.init).toBeCalledTimes(1);
  });

  it("addTask normal", async () => {
    controller.addTask(99, "title1");
    expect(usecase.addTask).toBeCalledTimes(1);
    expect(usecase.addTask).toBeCalledWith(
      new TaskInputData(0, 99, "title1", "")
    );
  });

  it("deleteTask normal", async () => {
    controller.deleteTask(1);
    expect(usecase.deleteTask).toBeCalledTimes(1);
    expect(usecase.deleteTask).toBeCalledWith(1);
  });

  it("updateTask normal", async () => {
    controller.updateTask(1, 99, "title1", "detail1");
    expect(usecase.updateTask).toBeCalledTimes(1);
    expect(usecase.updateTask).toBeCalledWith(
      new TaskInputData(1, 99, "title1", "detail1")
    );
  });
});
