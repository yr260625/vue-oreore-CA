import { ITaskUseCase } from "@/interfaces/usecase/TaskUseCase";

export class TaskController {
  constructor(private readonly usecase: ITaskUseCase) {}

  initTaskView() {
    this.usecase.initTaskView();
  }

  addTask(categoryId: number, title: string) {
    this.usecase.addTask(categoryId, title);
  }

  deleteTask(id: number) {
    this.usecase.deleteTask(id);
  }

  updateTask(
    taskId: number,
    categoryId: number,
    title: string,
    detail: string
  ) {
    this.usecase.updateTask(taskId, categoryId, title, detail);
  }
}
