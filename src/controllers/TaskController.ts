import { IS_TEST_MODE } from "@/features/constants";
import { TaskGateway } from "@/gateways/TaskGateway";
import { TaskApi } from "@/infrastructure/TaskApi";
import { TaskSessionStorage } from "@/infrastructure/TaskSessionStorage";
import { ITaskGateway } from "@/interfaces/gateways/TaskGateway";
import { ITaskInfrastructure } from "@/interfaces/infrastructure/TaskInfrastructure";
import { ITaskPresenter } from "@/interfaces/presenters/TaskPresenter";
import { ITaskUsecase } from "@/interfaces/usecases/TaskUsecase";
import { ITaskViewState } from "@/interfaces/view/TaskViewState";
import { TaskPresenter } from "@/presenters/TaskPresenter";
import { TaskUsecase } from "@/usecases/TaskUseCase";

export class TaskController {
  constructor(private readonly usecase: ITaskUsecase) {}

  static create(state: ITaskViewState): TaskController {
    const infrastructure: ITaskInfrastructure = IS_TEST_MODE
      ? new TaskSessionStorage()
      : new TaskApi();
    const gateway: ITaskGateway = new TaskGateway(infrastructure);
    const presenter: ITaskPresenter = new TaskPresenter(state);
    const usecase: ITaskUsecase = new TaskUsecase(gateway, presenter);
    return new TaskController(usecase);
  }

  initTaskView() {
    this.usecase.initTaskView();
  }

  addTask(categoryId: number, title: string) {
    this.usecase.addTask(categoryId, title);
  }

  deleteTask(id: number) {
    this.usecase.deleteTask(id);
  }

  updateTask(
    taskId: number,
    categoryId: number,
    title: string,
    detail: string
  ) {
    this.usecase.updateTask(taskId, categoryId, title, detail);
  }
}
