import {
  TTaskView,
  TaskViewModel,
} from "src/adapter/tasks/interfaces/TaskViewModel";
import { ITaskView } from "../interfaces/TaskView";

// each method will update reactive state in vue components
export class TaskView implements ITaskView {
  constructor(readonly taskViewModel: TaskViewModel) {}

  init(taskViewModel: TaskViewModel): void {
    this.taskViewModel.categories = taskViewModel.categories;
    this.taskViewModel.categoryId = taskViewModel.categoryId;
    this.taskViewModel.taskTitle = taskViewModel.taskTitle;
    this.taskViewModel.tasks = taskViewModel.tasks;
    this.taskViewModel.errorSummary = taskViewModel.errorSummary;
  }

  addTask(task: TTaskView): void {
    this.taskViewModel.tasks.push(task);
    this.taskViewModel.taskTitle = "";
    this.taskViewModel.categoryId = this.taskViewModel.categories[0].id;
  }

  removeTask(id: number): void {
    this.taskViewModel.tasks = this.taskViewModel.tasks.filter(
      (elm: TTaskView) => id !== elm.id
    );
  }

  setError(error: string): void {
    this.taskViewModel.errorSummary = error;
  }
  setErrorDetail(taskId: number, error: string): void {
    const index = this.taskViewModel.tasks.findIndex((elm) => elm.id == taskId);
    this.taskViewModel.tasks[index].error = error;
  }
}
