import { TaskAddedOutputData } from "src/domain/tasks/TaskAddedOutputData";
import { TaskInitOutputData } from "src/domain/tasks/TaskInitOutputData";

export interface ITaskPresenter {
  init(outputData: TaskInitOutputData): void;
  addTask(outputData: TaskAddedOutputData): void;
  removeTask(id: number): void;
  setError(error: string): void;
  setErrorDetail(taskId: number, error: string): void;
}
