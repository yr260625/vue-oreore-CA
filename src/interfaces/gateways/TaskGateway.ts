import { Task } from "@/entities";
import { TCategory, TTask } from "../infrastructure/TaskInfrastructure";

export interface ITaskGateway {
  findAll(): Promise<TTask[]>;
  save(task: Task): Promise<TTask>;
  update(task: Task): Promise<TTask>;
  deleteById(id: number): Promise<void>;
  findAllCategories(): Promise<TCategory[]>;
}
