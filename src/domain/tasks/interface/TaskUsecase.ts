import { TaskInputData } from "src/domain/tasks/TaskInputData";

export interface ITaskUsecase {
  init(): Promise<void>;
  addTask(taskInputData: TaskInputData): Promise<void>;
  updateTask(taskInputData: TaskInputData): Promise<void>;
  deleteTask(id: number): Promise<void>;
}
