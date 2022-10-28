import { TCategory, TTask } from "../view/TaskView";

export interface ITaskPresenter {
  initTaskView(categoryList: TCategory[], taskList: TTask[]): void;
  addTaskState(task: TTask): void;
  removeTaskStateById(id: number): void;
  setError(error: string): void;
  setErrorDetail(taskId: number, error: string): void;
}
