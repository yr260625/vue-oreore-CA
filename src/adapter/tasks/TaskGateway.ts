import { Category } from "src/domain/tasks/entities/Category";
import { Task } from "src/domain/tasks/entities/Task";
import { CategoryName } from "src/domain/tasks/entities/vo/CategoryName";
import { TaskDetail } from "src/domain/tasks/entities/vo/TaskDetail";
import { TaskTitle } from "src/domain/tasks/entities/vo/TaskTitle";
import { ITaskInfrastructure } from "src/driver/task/interface/TaskInfrastructure";
import { ITaskGateway } from "./interfaces/TaskGateway";

export class TaskGateway implements ITaskGateway {
  private readonly infrastructure: ITaskInfrastructure;

  constructor(infrastructure: ITaskInfrastructure) {
    this.infrastructure = infrastructure;
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.infrastructure.findAll();
    return tasks.map((elm) => {
      const id = elm.id;
      const category = new Category(elm.category, new CategoryName(""));
      const taskTitle = new TaskTitle(elm.title);
      const taskDetail = new TaskDetail(elm.detail);
      return new Task(id, category, taskTitle, taskDetail);
    });
  }

  async findAllCategories(): Promise<Category[]> {
    const categories = await this.infrastructure.findAllCategories();
    return categories.map((elm) => {
      return new Category(elm.id, new CategoryName(elm.name));
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
    const id = savedItem.id;
    const category = new Category(savedItem.category, new CategoryName(""));
    const taskTitle = new TaskTitle(savedItem.title);
    const taskDetail = new TaskDetail(savedItem.detail);
    return new Task(id, category, taskTitle, taskDetail);
  }

  async update(task: Task): Promise<Task> {
    const updateItem = {
      id: task.id,
      category: task.category.id,
      title: task.title.value,
      detail: task.detail.value,
    };
    const updatedItem = await this.infrastructure.update(updateItem);
    const id = updatedItem.id;
    const category = new Category(updatedItem.category, new CategoryName(""));
    const taskTitle = new TaskTitle(updatedItem.title);
    const taskDetail = new TaskDetail(updatedItem.detail);
    return new Task(id, category, taskTitle, taskDetail);
  }

  deleteById(id: number): Promise<void> {
    return this.infrastructure.deleteById(id);
  }
}
