import { Task } from "./entities/Task";

export class TaskAddedOutputData {
  constructor(
    readonly id: number = 0,
    readonly categoryId: number,
    readonly title: string = "",
    readonly detail: string = ""
  ) {}

  static createFromEntity(task: Task) {
    return new TaskAddedOutputData(
      task.id,
      task.category.id,
      task.title.value,
      task.detail.value
    );
  }
}
