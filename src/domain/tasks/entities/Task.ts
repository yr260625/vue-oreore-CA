import { Category } from "src/domain/tasks/entities/Category";
import { CategoryName } from "src/domain/tasks/entities/vo/CategoryName";
import { TaskDetail } from "src/domain/tasks/entities/vo/TaskDetail";
import { TaskTitle } from "src/domain/tasks/entities/vo/TaskTitle";

export class Task {
  constructor(
    readonly id: number,
    readonly category: Category,
    readonly title: TaskTitle,
    readonly detail: TaskDetail
  ) {}

  static create(id: number, categoryId: number, title: string, detail: string) {
    const category = new Category(categoryId, new CategoryName("dummuy"));
    const taskTitle = new TaskTitle(title);
    const taskDetail = new TaskDetail(detail);
    return new Task(id, category, taskTitle, taskDetail);
  }
}
