import { TaskPresenter } from "src/adapter/tasks/TaskPresenter";
import { TaskAddedOutputData } from "src/domain/tasks/TaskAddedOutputData";
import { TaskInitOutputData } from "src/domain/tasks/TaskInitOutputData";
import { ITaskView } from "src/view/components/interfaces/TaskView";

// viewmodel mock
const useTaskView = () => {
  const init = jest.fn().mockResolvedValue(undefined);
  const addTask = jest.fn().mockResolvedValue(undefined);
  const removeTask = jest.fn().mockResolvedValue(undefined);
  const setError = jest.fn().mockResolvedValue(undefined);
  const setErrorDetail = jest.fn();

  const mockView = jest.fn<ITaskView, []>().mockImplementation(() => ({
    init,
    addTask,
    removeTask,
    setError,
    setErrorDetail,
  }));

  return {
    mockView,
    init,
    addTask,
    removeTask,
    setError,
    setErrorDetail,
  };
};

// DI
const taskview = useTaskView();
const presenter = new TaskPresenter(taskview.mockView());

// test execution
describe("TaskPresenter", () => {
  it("init normal", () => {
    const outputData: TaskInitOutputData = {
      categories: [
        { id: 1, name: "test1" },
        { id: 2, name: "test2" },
        { id: 3, name: "test3" },
        { id: 4, name: "test4" },
      ],
      tasks: [],
    };

    presenter.init(outputData);
    expect(taskview.init).toBeCalledTimes(1);
    expect(taskview.init).toBeCalledWith({
      categories: outputData.categories,
      categoryId: outputData.categories[0].id,
      taskTitle: "",
      errorSummary: "",
      tasks: outputData.tasks,
    });
  });

  it("addTask normal", () => {
    const outputData: TaskAddedOutputData = {
      id: 0,
      categoryId: 10,
      title: "title",
      detail: "detail",
    };
    presenter.addTask(outputData);
    expect(taskview.addTask).toBeCalledTimes(1);
    expect(taskview.addTask).toBeCalledWith({
      id: outputData.id,
      category: outputData.categoryId,
      title: outputData.title,
      detail: outputData.detail,
    });
  });

  it("removeTask normal", () => {
    presenter.removeTask(1);
    expect(taskview.removeTask).toBeCalledTimes(1);
    expect(taskview.removeTask).toBeCalledWith(1);
  });

  it("setError normal", () => {
    presenter.setError("error");
    expect(taskview.setError).toBeCalledTimes(1);
    expect(taskview.setError).toBeCalledWith("error");
  });

  it("setErrorDetail normal", () => {
    presenter.setErrorDetail(1, "error");
    expect(taskview.setErrorDetail).toBeCalledTimes(1);
    expect(taskview.setErrorDetail).toBeCalledWith(1, "error");
  });
});
