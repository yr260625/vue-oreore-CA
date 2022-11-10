import { ITaskUsecase } from "@/interfaces/usecases/TaskUsecase";

export class TaskController {
  constructor(private readonly usecase: ITaskUsecase) {}

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
