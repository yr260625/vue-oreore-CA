import { Category } from "src/domain/tasks/entities/Category";
import { Task } from "src/domain/tasks/entities/Task";
import { TaskAddedOutputData } from "src/domain/tasks/TaskAddedOutputData";
import { TaskInitOutputData } from "src/domain/tasks/TaskInitOutputData";
import { TaskInputData } from "src/domain/tasks/TaskInputData";
import { TaskUsecase } from "src/domain/tasks/TaskUsecase";
import { useGateway, useGatewayError } from "src/__mock__/tasks/useGateway";
import { usePresenter } from "src/__mock__/tasks/usePresenter";

// DTO mock
const taskInitDataMock: TaskInitOutputData = {
  categories: [
    { id: 1, name: "test1" },
    { id: 2, name: "test2" },
    { id: 3, name: "test3" },
    { id: 4, name: "test4" },
  ],
  tasks: [],
};
jest.mock("src/domain/tasks/TaskInitOutputData", () => {
  return {
    TaskInitOutputData: jest.fn().mockImplementation(() => taskInitDataMock),
  };
});
jest.mock("src/domain/tasks/TaskAddedOutputData", () => {
  return {
    TaskAddedOutputData: jest
      .fn()
      .mockImplementation((id, categoryId, title, detail) => {
        return { id, categoryId, title, detail };
      }),
  };
});

// entity mock
const categorySpy = jest.spyOn(Category, "create");
categorySpy.mockImplementation((id: number, name: string) => {
  const category = { id, name } as unknown as Category;
  return category;
});
const categories = [
  Category.create(11, "category_name1"),
  Category.create(12, "category_name2"),
  Category.create(13, "category_name3"),
];

const taskSpy = jest.spyOn(Task, "create");
taskSpy.mockImplementation(
  (id: number, categoryId: number, title: string, detail: string) => {
    const task = {
      id,
      category: { id: categoryId, name: "dummy" },
      title: { value: title },
      detail: { value: detail },
    } as unknown as Task;
    return task;
  }
);
const tasks = [
  Task.create(1, 11, "task1", "task1_detail"),
  Task.create(2, 12, "task2", "task2_detail"),
  Task.create(3, 13, "task3", "task3_detail"),
  Task.create(4, 14, "task4", "task4_detail"),
];

// test after proc
afterEach(() => {
  jest.clearAllMocks();
});

// test execution
describe("TaskUsecase", () => {
  it("init normal", async () => {
    const gateway = useGateway(tasks, categories);
    const presenter = usePresenter();
    const usecase = new TaskUsecase(
      gateway.mockGateway(),
      presenter.mockPresenter()
    );

    await usecase.init();
    expect(gateway.findAllCategories).toBeCalledTimes(1);
    expect(gateway.findAll).toBeCalledTimes(1);
    expect(TaskInitOutputData).toBeCalledWith(categories, tasks);
    expect(presenter.init).toBeCalledTimes(1);
    expect(presenter.init).toBeCalledWith(taskInitDataMock);
  });

  it("init error", async () => {
    const gateway = useGatewayError();
    const presenter = usePresenter();
    const usecase = new TaskUsecase(
      gateway.mockGateway(),
      presenter.mockPresenter()
    );

    await usecase.init();
    expect(presenter.init).toBeCalledTimes(0);
    expect(presenter.setError).toBeCalledTimes(1);
  });

  it("addTask normal", async () => {
    const gateway = useGateway(tasks, categories);
    const presenter = usePresenter();
    const usecase = new TaskUsecase(
      gateway.mockGateway(),
      presenter.mockPresenter()
    );

    const taskInputData = new TaskInputData(0, 10, "title_add", "detail_add");
    const newTask = Task.create(
      taskInputData.id,
      taskInputData.categoryId,
      taskInputData.title,
      taskInputData.detail
    );
    const outputData = new TaskAddedOutputData(
      newTask.id,
      newTask.category.id,
      newTask.title.value,
      newTask.detail.value
    );
    await usecase.addTask(taskInputData);
    expect(gateway.save).toBeCalledTimes(1);
    expect(gateway.save).toBeCalledWith(newTask);
    expect(presenter.addTask).toBeCalledTimes(1);
    expect(presenter.addTask).toBeCalledWith(outputData);
    expect(presenter.setError).toBeCalledTimes(0);
  });

  it("addTask error", async () => {
    const gatewayError = useGatewayError();
    const presenter = usePresenter();
    const usecase = new TaskUsecase(
      gatewayError.mockGateway(),
      presenter.mockPresenter()
    );

    const taskInputData = new TaskInputData(0, 10, "title_add", "detail_add");
    await usecase.addTask(taskInputData);
    expect(presenter.addTask).toBeCalledTimes(0);
    expect(presenter.setError).toBeCalledTimes(1);
  });

  it("updateTask normal", async () => {
    const gateway = useGateway(tasks, categories);
    const presenter = usePresenter();
    const usecase = new TaskUsecase(
      gateway.mockGateway(),
      presenter.mockPresenter()
    );

    const taskInputData = new TaskInputData(1, 10, "title_upd", "detail_upd");
    const newTask = Task.create(
      taskInputData.id,
      taskInputData.categoryId,
      taskInputData.title,
      taskInputData.detail
    );
    await usecase.updateTask(taskInputData);
    expect(gateway.update).toBeCalledTimes(1);
    expect(gateway.update).toBeCalledWith(newTask);
    expect(presenter.setErrorDetail).toBeCalledTimes(0);
  });

  it("updateTask error", async () => {
    const gatewayError = useGatewayError();
    const presenter = usePresenter();
    const usecase = new TaskUsecase(
      gatewayError.mockGateway(),
      presenter.mockPresenter()
    );

    const taskInputData = new TaskInputData(1, 10, "title_upd", "detail_upd");
    await usecase.updateTask(taskInputData);
    expect(presenter.setErrorDetail).toBeCalledTimes(1);
  });

  it("deleteTask normal", async () => {
    const gateway = useGateway(tasks, categories);
    const presenter = usePresenter();
    const usecase = new TaskUsecase(
      gateway.mockGateway(),
      presenter.mockPresenter()
    );

    await usecase.deleteTask(1);
    expect(presenter.removeTask).toBeCalledTimes(1);
    expect(presenter.setErrorDetail).toBeCalledTimes(0);
  });

  it("deleteTask error", async () => {
    const gatewayError = useGatewayError();
    const presenter = usePresenter();
    const usecase = new TaskUsecase(
      gatewayError.mockGateway(),
      presenter.mockPresenter()
    );

    await usecase.deleteTask(1);
    expect(presenter.removeTask).toBeCalledTimes(0);
    expect(presenter.setErrorDetail).toBeCalledTimes(1);
  });
});
