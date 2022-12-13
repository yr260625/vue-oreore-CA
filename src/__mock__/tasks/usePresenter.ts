import { ITaskPresenter } from "src/adapter/tasks/interfaces/TaskPresenter";
import { TaskInitOutputData } from "src/domain/tasks/TaskInitOutputData";

export const usePresenter = () => {
  const init = jest
    .fn()
    .mockImplementation((outputData: TaskInitOutputData) => {});
  const addTask = jest.fn().mockResolvedValue(undefined);
  const removeTask = jest.fn().mockResolvedValue(undefined);
  const setError = jest.fn().mockResolvedValue(undefined);
  const setErrorDetail = jest.fn().mockResolvedValue(undefined);

  const mockPresenter = jest
    .fn<ITaskPresenter, []>()
    .mockImplementation(() => ({
      init,
      addTask,
      removeTask,
      setError,
      setErrorDetail,
    }));

  return {
    mockPresenter,
    init,
    addTask,
    removeTask,
    setError,
    setErrorDetail,
  };
};
