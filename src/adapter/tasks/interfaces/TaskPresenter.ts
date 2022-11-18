import { TCategory, TTask } from "src/driver/task/interface/TaskInfrastructure";

export interface ITaskPresenter {
  initTaskView(categoryList: TCategory[], taskList: TTask[]): void;
  addTaskState(task: TTask): void;
  removeTaskStateById(id: number): void;
  setError(error: string): void;
  setErrorDetail(taskId: number, error: string): void;
}
