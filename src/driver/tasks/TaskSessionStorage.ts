import {
  ITaskInfrastructure,
  TTask,
  TCategory,
} from "src/driver/tasks/interfaces/TaskInfrastructure";

export class TaskSessionStorage implements ITaskInfrastructure {
  private tasks: TTask[] = [];
  private categories: TCategory[] = [
    { id: 1, name: "category1" },
    { id: 2, name: "category2" },
    { id: 3, name: "category3" },
  ];
  private readonly storage: Storage = window.sessionStorage;
  private counter: number = 0;

  constructor() {
    if (!this.storage.getItem("tasks")) {
      this.storage.setItem("tasks", JSON.stringify([]));
      this.tasks = [];
      this.counter = 0;
    } else {
      this.tasks = JSON.parse(this.storage.getItem("tasks") as string);
      this.counter = this.tasks.length;
    }
    this.storage.setItem("categories", JSON.stringify(this.categories));
  }

  async findAll(): Promise<TTask[]> {
    return this.tasks;
  }

  async findAllCategories(): Promise<TCategory[]> {
    return this.categories;
  }

  async save(task: TTask): Promise<TTask> {
    const addTask: TTask = {
      id: this.counter,
      category: task.category,
      title: task.title,
      detail: task.detail,
    };
    this.tasks.push(addTask);
    this.storage.setItem("tasks", JSON.stringify(this.tasks));
    this.counter += 1;
    return addTask;
  }

  async update(task: TTask): Promise<TTask> {
    this.tasks = this.tasks.map((elm: TTask) => {
      if (task.id === elm.id) elm = task;
      return elm;
    });
    this.storage.setItem("tasks", JSON.stringify(this.tasks));
    return task;
  }

  async deleteById(id: number): Promise<any> {
    this.tasks = this.tasks.filter((elm: TTask) => id !== elm.id);
    this.storage.setItem("tasks", JSON.stringify(this.tasks));
  }
}
