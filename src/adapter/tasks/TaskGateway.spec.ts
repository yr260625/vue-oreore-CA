import { TaskGateway } from "src/adapter/tasks/TaskGateway";
import { Category } from "src/domain/tasks/entities/Category";
import { Task } from "src/domain/tasks/entities/Task";
import {
  ITaskInfrastructure,
  TCategory,
  TTask,
} from "src/driver/tasks/interfaces/TaskInfrastructure";

// entity mock
const categorySpy = jest.spyOn(Category, "create");
categorySpy.mockImplementation((id: number, name: string) => {
  const category = { id, name } as unknown as Category;
  return category;
});

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

// infrastructure mock
const useMockInfrastructure = (
  taskList: TTask[],
  newTask: TTask,
  categories: TCategory[]
) => {
  const findAll = jest.fn().mockResolvedValue(taskList);
  const findAllCategories = jest.fn().mockResolvedValue(categories);
  const save = jest.fn().mockResolvedValue(newTask);
  const update = jest.fn().mockResolvedValue(newTask);
  const deleteById = jest.fn().mockResolvedValue(undefined);

  const mockInfrastructure = jest
    .fn<ITaskInfrastructure, []>()
    .mockImplementation(() => ({
      findAll,
      findAllCategories,
      save,
      update,
      deleteById,
    }));

  return {
    mockInfrastructure,
    findAll,
    findAllCategories,
    save,
    update,
    deleteById,
  };
};

// DI
const tasks: TTask[] = [
  { id: 1, category: 1, title: "title1", detail: "detail1" },
  { id: 2, category: 1, title: "title2", detail: "detail2" },
  { id: 3, category: 1, title: "title3", detail: "detail3" },
  { id: 4, category: 2, title: "title4", detail: "detail4" },
];
const newTask: TTask = {
  id: 99,
  category: 99,
  title: "title_99",
  detail: "detail_99",
};
const categories: TCategory[] = [
  { id: 1, name: "test1" },
  { id: 1, name: "test3" },
  { id: 1, name: "test4" },
  { id: 2, name: "test5" },
];
const infrastructure = useMockInfrastructure(tasks, newTask, categories);
const gateway = new TaskGateway(infrastructure.mockInfrastructure());

afterEach(() => jest.clearAllMocks());

// test execution
describe("TaskGateway", () => {
  it("findAll normal", async () => {
    const res = await gateway.findAll();
    expect(infrastructure.findAll).toBeCalled();
    expect(res.length).toBe(tasks.length);
    expect(Task.create).toBeCalledTimes(tasks.length);
  });

  it("findAllCategories normal", async () => {
    const res = await gateway.findAllCategories();
    expect(infrastructure.findAllCategories).toBeCalled();
    expect(res.length).toBe(categories.length);
    expect(Category.create).toBeCalledTimes(categories.length);
  });

  it("save normal", async () => {
    const task = Task.create(1, 2, "title", "detail");
    const res = await gateway.save(task);
    expect(infrastructure.save).toBeCalled();
    expect(infrastructure.save).toBeCalledWith({
      id: 1,
      category: 2,
      title: "title",
      detail: "detail",
    });
    expect(Task.create).toBeCalledTimes(1 + 1);
    expect(res).toEqual(
      Task.create(newTask.id, newTask.category, newTask.title, newTask.detail)
    );
  });

  it("update normal", async () => {
    const task = Task.create(1, 2, "title", "detail");
    const res = await gateway.update(task);
    expect(infrastructure.update).toBeCalled();
    expect(infrastructure.update).toBeCalledWith({
      id: 1,
      category: 2,
      title: "title",
      detail: "detail",
    });
    expect(res).toEqual(
      Task.create(newTask.id, newTask.category, newTask.title, newTask.detail)
    );
  });

  it("deleteById normal", async () => {
    await gateway.deleteById(1);
    expect(infrastructure.deleteById).toBeCalled();
    expect(infrastructure.deleteById).toBeCalledWith(1);
  });
});
