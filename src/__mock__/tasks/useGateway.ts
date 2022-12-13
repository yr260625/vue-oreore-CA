import { ITaskGateway } from "src/adapter/tasks/interfaces/TaskGateway";
import { Category } from "src/domain/tasks/entities/Category";
import { Task } from "src/domain/tasks/entities/Task";

// gateway mock
export const useGateway = (tasks: Task[], categories: Category[]) => {
  const findAll = jest.fn().mockResolvedValue(tasks);
  const findAllCategories = jest.fn().mockResolvedValue(categories);
  const save = jest
    .fn()
    .mockImplementation((task: Task) => Promise.resolve(task));
  const update = jest
    .fn()
    .mockImplementation((task: Task) => Promise.resolve(task));
  const deleteById = jest.fn().mockResolvedValue(undefined);

  const mockGateway = jest.fn<ITaskGateway, []>().mockImplementation(() => ({
    findAll,
    save,
    update,
    deleteById,
    findAllCategories,
  }));

  return {
    mockGateway,
    findAll,
    save,
    update,
    deleteById,
    findAllCategories,
  };
};

// gateway mock error
export const useGatewayError = () => {
  const findAll = jest.fn().mockRejectedValue("findAll rejected");
  const save = jest.fn().mockRejectedValue("save rejected");
  const update = jest.fn().mockRejectedValue("update rejected");
  const deleteById = jest.fn().mockRejectedValue("deleteById rejected");
  const findAllCategories = jest.fn().mockRejectedValue("findAll rejected");

  const mockGateway = jest.fn<ITaskGateway, []>().mockImplementation(() => ({
    findAll,
    save,
    update,
    deleteById,
    findAllCategories,
  }));

  return {
    mockGateway,
    findAll,
    save,
    update,
    deleteById,
    findAllCategories,
  };
};
