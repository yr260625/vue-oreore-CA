import { ITaskGateway } from "src/adapter/tasks/interfaces/TaskGateway";
import { ITaskPresenter } from "src/adapter/tasks/interfaces/TaskPresenter";
import { ITaskUsecase } from "./interface/TaskUsecase";
import { TaskInputData } from "./TaskInputData";
import { TaskInitOutputData } from "./TaskInitOutputData";
import { TaskAddedOutputData } from "./TaskAddedOutputData";

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
   * @param taskInputData
   */
  async addTask(taskInputData: TaskInputData): Promise<void> {
    try {
      const task = taskInputData.createTask();
      const newTask = await this.gateway.save(task);
      const outputData = TaskAddedOutputData.createFromEntity(newTask);
      this.presenter.addTask(outputData);
    } catch (error: unknown) {
      this.presenter.setError(this.getErrorMessage(error));
    }
  }

  /**
   * update single task in DB.
   * @param taskInputData
   */
  async updateTask(taskInputData: TaskInputData): Promise<void> {
    try {
      const task = taskInputData.createTask();
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
    console.log(error);
    if (error instanceof Error) {
      return error.message;
    } else {
      return "unknown error type";
    }
  }
}
