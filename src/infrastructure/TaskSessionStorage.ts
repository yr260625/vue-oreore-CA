import {
  ITaskInfrastructure,
  TCategory,
  TTask,
} from "@/interfaces/infrastructure/TaskInfrastructure";

export class TaskSessionStorage implements ITaskInfrastructure {
  private readonly storage: Storage = window.sessionStorage;

  async findAll(): Promise<TTask[]> {
    const unparsedTasks: string | null = this.storage.getItem("tasks");
    if (!unparsedTasks) {
      return [];
    }
    return JSON.parse(unparsedTasks);
  }

  async save(task: TTask): Promise<TTask> {
    const beforeTasks: TTask[] = await this.findAll();
    const addTask: TTask = {
      id: beforeTasks.length,
      category: task.category,
      title: task.title,
      detail: task.detail,
    };
    const newTasks: TTask[] = [...beforeTasks, addTask];
    this.storage.setItem("tasks", JSON.stringify(newTasks));
    return task;
  }

  async update(task: TTask): Promise<TTask> {
    const beforeTasks: TTask[] = await this.findAll();
    const newTasks = [...beforeTasks].map((elm: TTask) => {
      if (task.id === elm.id) elm = task;
      return elm;
    });
    this.storage.setItem("tasks", JSON.stringify(newTasks));
    return task;
  }

  async deleteById(id: number): Promise<any> {
    const newTasks = [...(await this.findAll())].filter(
      (elm: TTask) => id !== elm.id
    );
    this.storage.setItem("tasks", JSON.stringify(newTasks));
  }

  async findAllCategories(): Promise<TCategory[]> {
    return [
      { id: 1, name: "category1" },
      { id: 2, name: "category2" },
      { id: 3, name: "category3" },
    ];
  }
}
