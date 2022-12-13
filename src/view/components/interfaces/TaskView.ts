import { TaskViewModel } from "src/adapter/tasks/interfaces/TaskViewModel";
import { TTask } from "src/driver/tasks/interfaces/TaskInfrastructure";

export interface ITaskView {
  init(taskModelView: TaskViewModel): void;
  addTask(task: TTask): void;
  removeTask(id: number): void;
  setError(error: string): void;
  setErrorDetail(taskId: number, error: string): void;
}
