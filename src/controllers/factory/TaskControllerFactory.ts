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
import { TaskController } from "../TaskController";
import { ControllerFactory } from "./ControllerFactory";

export class TaskControllerFactory extends ControllerFactory<
  ITaskInfrastructure,
  ITaskGateway,
  ITaskViewState,
  ITaskPresenter,
  ITaskUsecase,
  TaskController
> {
  constructor(private readonly state: ITaskViewState) {
    super();
  }

  getInfrastructure(): ITaskInfrastructure {
    if (IS_TEST_MODE) {
      return new TaskSessionStorage();
    }
    return new TaskApi();
  }
  getGateway(infrastructure: ITaskInfrastructure): ITaskGateway {
    return new TaskGateway(infrastructure);
  }
  getViewState(): ITaskViewState {
    return this.state;
  }
  getPresenter(state: ITaskViewState): ITaskPresenter {
    return new TaskPresenter(state);
  }
  getUsecase(gateway: ITaskGateway, presenter: ITaskPresenter): ITaskUsecase {
    return new TaskUsecase(gateway, presenter);
  }
  getController(usecase: ITaskUsecase): TaskController {
    return new TaskController(usecase);
  }
}
