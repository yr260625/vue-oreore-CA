import { Task } from "@/entities";
import { ITaskPresenter } from "@/interfaces/presenters/TaskPresenter";
import { ITaskGateway } from "@/interfaces/gateways/TaskGateway";
import { ITaskUsecase } from "@/interfaces/usecases/TaskUsecase";

export class TaskUsecase implements ITaskUsecase {
  constructor(
    private readonly gateway: ITaskGateway,
    private readonly presenter: ITaskPresenter
  ) {}

  /**
   * concurrently get all categories and tasks, and initialize the state of vue.
   */
  async initTaskView(): Promise<void> {
    try {
      const [categoryList, taskList] = await Promise.all([
        this.gateway.findAllCategories(),
        this.gateway.findAll(),
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
      const newTask = await this.gateway.save(task);
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
      await this.gateway.update(task);
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
      await this.gateway.deleteById(taskId);
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
