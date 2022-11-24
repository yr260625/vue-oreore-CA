import { Category } from "./entities/Category";
import { Task } from "./entities/Task";
import { CategoryName } from "./entities/vo/CategoryName";
import { TaskDetail } from "./entities/vo/TaskDetail";
import { TaskTitle } from "./entities/vo/TaskTitle";

export class TaskInputData {
  constructor(
    readonly id: number = 0,
    readonly categoryId: number,
    readonly title: string = "",
    readonly detail: string = ""
  ) {}

  createTask() {
    const id = this.id;
    const category = new Category(this.categoryId, new CategoryName("dummy"));
    const taskTitle = new TaskTitle(this.title);
    const taskDetail = new TaskDetail(this.detail);
    return new Task(id, category, taskTitle, taskDetail);
  }
}
