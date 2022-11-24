import { Category } from "./Category";
import { TaskDetail } from "./vo/TaskDetail";
import { TaskTitle } from "./vo/TaskTitle";

export class Task {
  constructor(
    readonly id: number,
    readonly category: Category,
    readonly title: TaskTitle,
    readonly detail: TaskDetail
  ) {}
}
