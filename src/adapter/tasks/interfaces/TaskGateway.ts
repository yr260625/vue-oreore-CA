import { Category } from "src/domain/tasks/entities/Category";
import { Task } from "src/domain/tasks/entities/Task";

export interface ITaskGateway {
  findAll(): Promise<Task[]>;
  save(task: Task): Promise<Task>;
  update(task: Task): Promise<Task>;
  deleteById(id: number): Promise<void>;
  findAllCategories(): Promise<Category[]>;
}
