import { Task } from "src/domain/tasks/TaskEntity";
import { TTask, TCategory } from "src/driver/task/interface/TaskInfrastructure";

export interface ITaskGateway {
  findAll(): Promise<TTask[]>;
  save(task: Task): Promise<TTask>;
  update(task: Task): Promise<TTask>;
  deleteById(id: number): Promise<void>;
  findAllCategories(): Promise<TCategory[]>;
}
