import { TaskInputData } from "src/domain/tasks/TaskInputData";
import { ITaskUsecase } from "src/domain/tasks/interface/TaskUsecase";

export class TaskController {
  constructor(private readonly usecase: ITaskUsecase) {}

  init() {
    this.usecase.init();
  }

  addTask(categoryId: number, title: string) {
    const taskInputData = new TaskInputData(0, categoryId, title, "");
    this.usecase.addTask(taskInputData);
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
    const taskInputData = new TaskInputData(taskId, categoryId, title, detail);
    this.usecase.updateTask(taskInputData);
  }
}
