import { TaskTitle, TaskDetail, CategoryName } from "@/entities/vo";
import { Category } from "@/entities/Category";

export class Task {
  constructor(
    readonly id: number,
    readonly category: Category,
    readonly title: TaskTitle,
    readonly detail: TaskDetail
  ) {}

  public static createUnPostedTask(categoryId: number, title: string) {
    return new Task(
      0,
      new Category(categoryId, new CategoryName("create")),
      new TaskTitle(title),
      new TaskDetail("")
    );
  }

  public static createPostedTask(
    taskId: number,
    categoryId: number,
    title: string,
    detail: string
  ) {
    return new Task(
      taskId,
      new Category(categoryId, new CategoryName("update")),
      new TaskTitle(title),
      new TaskDetail(detail)
    );
  }
}
