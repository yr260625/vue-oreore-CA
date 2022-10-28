import { Task } from "@/entities";
import { TCategory, TTask } from "@/interfaces/view/TaskView";

export interface ITaskRepository {
  findAll(): Promise<TTask[]>;
  save(task: Task): Promise<TTask>;
  update(task: Task): Promise<TTask>;
  deleteById(id: number): Promise<void>;
  findAllCategories(): Promise<TCategory[]>;
}
