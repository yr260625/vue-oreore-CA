import { Task } from "@/entities";
import { ITaskPresenter } from "@/interfaces/presenter/TaskPresenter";
import { ITaskRepository } from "@/interfaces/repository/TaskRepository";
import { ITaskUseCase } from "@/interfaces/usecase/TaskUseCase";
import { TTask } from "@/interfaces/view/TaskView";

export class TaskUseCase implements ITaskUseCase {
  constructor(
    private readonly repository: ITaskRepository,
    private readonly presenter: ITaskPresenter
  ) {}

  /**
   * concurrently get all categories and tasks, and initialize the state of vue.
   */
  async initTaskView(): Promise<void> {
    try {
      const [categoryList, taskList] = await Promise.all([
        this.repository.findAllCategories(),
        this.repository.findAll(),
      ]);
      this.presenter.initTaskView(categoryList, taskList);
    } catch (error: unknown) {
      this.presenter.setError(this.getErrorMessage(error));
    }
  }

  /**
   * save single task in DB, and add the task the state of vue.
   * @param categoryId
   * @param title
   */
  async addTask(categoryId: number, title: string): Promise<void> {
    try {
      const task: Task = Task.createUnPostedTask(categoryId, title);
      const newTask: TTask = await this.repository.save(task);
      this.presenter.addTaskState(newTask);
    } catch (error: unknown) {
      this.presenter.setError(this.getErrorMessage(error));
    }
  }

  /**
   * update single task in DB.
   * @param taskId
   * @param categoryId
   * @param title
   * @param detail
   */
  async updateTask(
    taskId: number,
    categoryId: number,
    title: string,
    detail: string
  ): Promise<void> {
    try {
      const task: Task = Task.createPostedTask(
        taskId,
        categoryId,
        title,
        detail
      );
      await this.repository.update(task);
    } catch (error: unknown) {
      this.presenter.setErrorDetail(taskId, this.getErrorMessage(error));
    }
  }

  /**
   * delete single task in DB, and delete the task from the state of vue.
   * @param taskId
   */
  async deleteTask(taskId: number): Promise<void> {
    try {
      await this.repository.deleteById(taskId);
      this.presenter.removeTaskStateById(taskId);
    } catch (error: unknown) {
      this.presenter.setErrorDetail(taskId, this.getErrorMessage(error));
    }
  }

  /**
   * type Guard for try-catch
   * @param error
   * @returns
   */
  private getErrorMessage(error: unknown): string {
    console.log(error);
    if (error instanceof Error) {
      return error.message;
    } else {
      return "unknown error type";
    }
  }
}
