import { ITaskGateway } from "src/adapter/tasks/interfaces/TaskGateway";
import { Category } from "src/domain/tasks/entities/Category";
import { Task } from "src/domain/tasks/entities/Task";
import { ITaskInfrastructure } from "src/driver/tasks/interfaces/TaskInfrastructure";

export class TaskGateway implements ITaskGateway {
  private readonly infrastructure: ITaskInfrastructure;

  constructor(infrastructure: ITaskInfrastructure) {
    this.infrastructure = infrastructure;
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.infrastructure.findAll();
    return tasks.map((elm) => {
      return Task.create(elm.id, elm.category, elm.title, elm.detail);
    });
  }

  async findAllCategories(): Promise<Category[]> {
    const categories = await this.infrastructure.findAllCategories();
    return categories.map((elm) => {
      return Category.create(elm.id, elm.name);
    });
  }

  async save(task: Task): Promise<Task> {
    const saveItem = {
      id: task.id,
      category: task.category.id,
      title: task.title.value,
      detail: task.detail.value,
    };
    const savedItem = await this.infrastructure.save(saveItem);
    return Task.create(
      savedItem.id,
      savedItem.category,
      savedItem.title,
      savedItem.detail
    );
  }

  async update(task: Task): Promise<Task> {
    const updateItem = {
      id: task.id,
      category: task.category.id,
      title: task.title.value,
      detail: task.detail.value,
    };
    const updatedItem = await this.infrastructure.update(updateItem);
    return Task.create(
      updatedItem.id,
      updatedItem.category,
      updatedItem.title,
      updatedItem.detail
    );
  }

  deleteById(id: number): Promise<void> {
    return this.infrastructure.deleteById(id);
  }
}
