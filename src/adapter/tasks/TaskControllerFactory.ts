import { ControllerFactory } from "src/adapter/factory/ControllerFactory";
import { ITaskGateway } from "src/adapter/tasks/interfaces/TaskGateway";
import { ITaskPresenter } from "src/adapter/tasks/interfaces/TaskPresenter";
import { TaskController } from "src/adapter/tasks/TaskController";
import { TaskGateway } from "src/adapter/tasks/TaskGateway";
import { TaskPresenter } from "src/adapter/tasks/TaskPresenter";
import { ITaskUsecase } from "src/domain/tasks/interface/TaskUsecase";
import { TaskUsecase } from "src/domain/tasks/TaskUsecase";
import { ITaskInfrastructure } from "src/driver/tasks/interfaces/TaskInfrastructure";
import { TaskApi } from "src/driver/tasks/TaskApi";
import { TaskSessionStorage } from "src/driver/tasks/TaskSessionStorage";
import { ITaskView } from "src/view/components/interfaces/TaskView";

export class TaskControllerFactory extends ControllerFactory<
  ITaskInfrastructure,
  ITaskGateway,
  ITaskView,
  ITaskPresenter,
  ITaskUsecase,
  TaskController
> {
  constructor(private readonly view: ITaskView) {
    super();
  }

  getInfrastructure(): ITaskInfrastructure {
    if (import.meta.env.VITE_SKIP_LOGIN) {
      return new TaskSessionStorage();
    }
    return new TaskApi();
  }
  getGateway(infrastructure: ITaskInfrastructure): ITaskGateway {
    return new TaskGateway(infrastructure);
  }
  getView(): ITaskView {
    return this.view;
  }
  getPresenter(view: ITaskView): ITaskPresenter {
    return new TaskPresenter(view);
  }
  getUsecase(gateway: ITaskGateway, presenter: ITaskPresenter): ITaskUsecase {
    return new TaskUsecase(gateway, presenter);
  }
  getController(usecase: ITaskUsecase): TaskController {
    return new TaskController(usecase);
  }
}
