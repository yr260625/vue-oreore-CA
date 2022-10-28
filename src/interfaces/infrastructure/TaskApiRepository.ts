import { TCategory, TTask } from "@/interfaces/view/TaskView";

export interface ITaskApiRepository {
  findAll(): Promise<TTask[]>;
  save(task: saveItem): Promise<TTask>;
  update(task: updateItem): Promise<TTask>;
  deleteById(id: number): Promise<any>;
  findAllCategories(): Promise<TCategory[]>;
}

export type saveItem = { category: number; title: string; detail: string };
export type updateItem = { id: number; category: number; title: string; detail: string };
