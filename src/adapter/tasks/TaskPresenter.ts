import { TaskAddedOutputData } from "src/domain/tasks/TaskAddedOutputData";
import { TaskInitOutputData } from "src/domain/tasks/TaskInitOutputData";
import { ITaskView } from "src/view/components/interfaces/TaskView";
import { ITaskPresenter } from "./interfaces/TaskPresenter";
import {
  TaskViewModel,
  TCategoryView,
  TTaskView,
} from "./interfaces/TaskViewModel";

export class TaskPresenter implements ITaskPresenter {
  constructor(readonly taskView: ITaskView) {}

  init(outputData: TaskInitOutputData) {
    const categories: TCategoryView[] = outputData.categories.map((elm) => {
      return { id: elm.id, name: elm.name.value };
    });
    const tasks: TTaskView[] = outputData.tasks.map((elm) => {
      return {
        id: elm.id,
        category: elm.category.id,
        title: elm.title.value,
        detail: elm.detail.value,
      };
    });
    const taskViewModel = new TaskViewModel(
      categories,
      categories[0].id,
      "",
      "",
      tasks
    );

    this.taskView.init(taskViewModel);
  }

  addTask(outputData: TaskAddedOutputData) {
    const task: TTaskView = {
      id: outputData.id,
      category: outputData.categoryId,
      title: outputData.title,
      detail: outputData.detail,
    };
    this.taskView.addTask(task);
  }

  removeTask(id: number) {
    this.taskView.removeTask(id);
  }

  setError(error: string) {
    this.taskView.setError(error);
  }

  setErrorDetail(taskId: number, error: string) {
    this.taskView.setErrorDetail(taskId, error);
  }
}
