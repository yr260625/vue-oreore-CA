import { ITaskPresenter } from "src/adapter/tasks/interfaces/TaskPresenter";
import {
  TaskViewModel,
  TTaskView,
} from "src/adapter/tasks/interfaces/TaskViewModel";
import { TaskAddedOutputData } from "src/domain/tasks/TaskAddedOutputData";
import { TaskInitOutputData } from "src/domain/tasks/TaskInitOutputData";
import { ITaskView } from "src/view/components/interfaces/TaskView";

export class TaskPresenter implements ITaskPresenter {
  constructor(readonly taskView: ITaskView) {}

  init(outputData: TaskInitOutputData) {
    const taskViewModel = new TaskViewModel(
      outputData.categories,
      outputData.categories[0].id,
      "",
      "",
      outputData.tasks
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
