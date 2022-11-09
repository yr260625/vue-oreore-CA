import {
  ITaskInfrastructure,
  TCategory,
  TTask,
} from "@/interfaces/infrastructure/TaskInfrastructure";

export class TaskSessionStorage implements ITaskInfrastructure {
  private categories: TCategory[] = [
    { id: 1, name: "category1" },
    { id: 2, name: "category2" },
    { id: 3, name: "category3" },
  ];
  private tasks: TTask[] = [
    { id: 0, category: 1, title: "test1", detail: "" },
    { id: 1, category: 1, title: "test2", detail: "" },
    { id: 2, category: 2, title: "test3", detail: "" },
    { id: 3, category: 3, title: "test4", detail: "" },
  ];
  private readonly storage: Storage = window.sessionStorage;
  private counter: number = this.tasks.length;

  constructor() {
    this.storage.setItem("tasks", JSON.stringify(this.tasks));
    this.storage.setItem("categories", JSON.stringify(this.categories));
  }

  async findAll(): Promise<TTask[]> {
    return JSON.parse(this.storage.getItem("tasks") as string);
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

  async findAllCategories(): Promise<TCategory[]> {
    return JSON.parse(this.storage.getItem("categories") as string);
  }
}
