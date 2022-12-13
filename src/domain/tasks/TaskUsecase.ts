import { ITaskGateway } from "src/adapter/tasks/interfaces/TaskGateway";
import { ITaskPresenter } from "src/adapter/tasks/interfaces/TaskPresenter";
import { Task } from "src/domain/tasks/entities/Task";
import { ITaskUsecase } from "src/domain/tasks/interface/TaskUsecase";
import { TaskAddedOutputData } from "src/domain/tasks/TaskAddedOutputData";
import { TaskInitOutputData } from "src/domain/tasks/TaskInitOutputData";
import { TaskInputData } from "src/domain/tasks/TaskInputData";

export class TaskUsecase implements ITaskUsecase {
  constructor(
    private readonly gateway: ITaskGateway,
    private readonly presenter: ITaskPresenter
  ) {}

  /**
   * concurrently get all categories and tasks, and initialize the state of vue.
   */
  async init(): Promise<void> {
    try {
      const [categoryList, taskList] = await Promise.all([
        this.gateway.findAllCategories(),
        this.gateway.findAll(),
      ]);
      const outputData = new TaskInitOutputData(categoryList, taskList);
      this.presenter.init(outputData);
    } catch (error: unknown) {
      this.presenter.setError(this.getErrorMessage(error));
    }
  }

  /**
   * save single task in DB, and add the task the state of vue.
   * @param categoryId
   * @param title
   */
  async addTask(taskInputData: TaskInputData): Promise<void> {
    try {
      const task = Task.create(
        taskInputData.id,
        taskInputData.categoryId,
        taskInputData.title,
        taskInputData.detail
      );
      const newTask = await this.gateway.save(task);
      const outputData = new TaskAddedOutputData(
        newTask.id,
        newTask.category.id,
        newTask.title.value,
        newTask.detail.value
      );
      this.presenter.addTask(outputData);
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
  async updateTask(taskInputData: TaskInputData): Promise<void> {
    try {
      const task = Task.create(
        taskInputData.id,
        taskInputData.categoryId,
        taskInputData.title,
        taskInputData.detail
      );
      await this.gateway.update(task);
    } catch (error: unknown) {
      this.presenter.setErrorDetail(
        taskInputData.id,
        this.getErrorMessage(error)
      );
    }
  }

  /**
   * delete single task in DB, and delete the task from the state of vue.
   * @param taskId
   */
  async deleteTask(taskId: number): Promise<void> {
    try {
      await this.gateway.deleteById(taskId);
      this.presenter.removeTask(taskId);
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
    if (error instanceof Error) {
      return error.message;
    } else {
      return "unknown error type";
    }
  }
}
