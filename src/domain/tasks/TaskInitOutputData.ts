import { Category } from "./entities/Category";
import { Task } from "./entities/Task";

export class TaskInitOutputData {
  constructor(readonly categories: Category[], readonly tasks: Task[]) {}

  static createFromEntity(task: Task) {}
}
