import { ITaskRepository } from "@/interfaces/repository/TaskRepository";
import { Task } from "@/entities";
import { ITaskApiRepository } from "@/interfaces/infrastructure/TaskApiRepository";
import { TCategory, TTask } from "@/interfaces/view/TaskView";

export class TaskRepository implements ITaskRepository {
  private readonly infrastructure: ITaskApiRepository;

  constructor(infrastructure: ITaskApiRepository) {
    this.infrastructure = infrastructure;
  }
  findAll(): Promise<TTask[]> {
    return this.infrastructure.findAll();
  }
  save(task: Task): Promise<TTask> {
    const saveItem = {
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
