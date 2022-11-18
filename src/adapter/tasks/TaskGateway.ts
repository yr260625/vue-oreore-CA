import { Task } from "src/domain/tasks/TaskEntity";
import {
  ITaskInfrastructure,
  TTask,
  TCategory,
} from "src/driver/task/interface/TaskInfrastructure";
import { ITaskGateway } from "./interfaces/TaskGateway";

export class TaskGateway implements ITaskGateway {
  private readonly infrastructure: ITaskInfrastructure;

  constructor(infrastructure: ITaskInfrastructure) {
    this.infrastructure = infrastructure;
  }
  findAll(): Promise<TTask[]> {
    return this.infrastructure.findAll();
  }
  save(task: Task): Promise<TTask> {
    const saveItem = {
      id: task.id,
      category: task.category.id,
      title: task.title.value,
      detail: task.detail.value,
    };
    return this.infrastructure.save(saveItem);
  }
  update(task: Task): Promise<TTask> {
    const updateItem = {
      id: task.id,
      category: task.category.id,
      title: task.title.value,
      detail: task.detail.value,
    };
    return this.infrastructure.update(updateItem);
  }
  deleteById(id: number): Promise<void> {
    return this.infrastructure.deleteById(id);
  }
  findAllCategories(): Promise<TCategory[]> {
    return this.infrastructure.findAllCategories();
  }
}
