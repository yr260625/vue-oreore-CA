import {
  TCategoryView,
  TTaskView,
} from "src/adapter/tasks/interfaces/TaskViewModel";
import { Category } from "src/domain/tasks/entities/Category";
import { Task } from "src/domain/tasks/entities/Task";

export class TaskInitOutputData {
  readonly categories: TCategoryView[];
  readonly tasks: TTaskView[];

  constructor(categories: Category[], tasks: Task[]) {
    this.categories = categories.map((elm) => {
      return { id: elm.id, name: elm.name.value };
    });

    this.tasks = tasks.map((elm) => {
      return {
        id: elm.id,
        category: elm.category.id,
        title: elm.title.value,
        detail: elm.detail.value,
      };
    });
  }
}
