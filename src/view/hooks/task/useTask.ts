import { ITaskInfrastructure } from "@/interfaces/infrastructure/ITaskInfrastructure";
import { ITaskPresenter } from "@/interfaces/presenters/TaskPresenter";
import { ITaskGateway } from "@/interfaces/gateways/TaskGateway";
import { ITaskUseCase } from "@/interfaces/usecases/TaskUseCase";
import { TaskController } from "@/controllers/TaskController";
import { TaskApi } from "@/infrastructure/TaskApi";
import { TTaskViewState } from "@/interfaces/view/TaskView";
import { TaskPresenter } from "@/presenters/TaskPresenter";
import { TaskGateway } from "@/gateways/TaskGateway";
import { TaskUseCase } from "@/usecases/TaskUseCase";
import { InjectionKey, reactive, inject } from "vue";

// dependency injection
const getTaskController = (state: TTaskViewState): TaskController => {
  const infrastructure: ITaskInfrastructure = new TaskApi();
  const gateway: ITaskGateway = new TaskGateway(infrastructure);
  const presenter: ITaskPresenter = new TaskPresenter(state);
  const usecase: ITaskUseCase = new TaskUseCase(gateway, presenter);
  return new TaskController(usecase);
};

// provided state in task components
export const taskState = () => {
  // states
  const taskViewState = reactive<TTaskViewState>({
    categoryId: 0,
    categories: [],
    taskTitle: "",
    errorSummary: "",
    tasks: [],
  });
  const controller = getTaskController(taskViewState);

  return {
    taskViewState,
    controller,
  };
};

// component injection
export type taskStateType = ReturnType<typeof taskState>;
export const taskStateKey: InjectionKey<taskStateType> = Symbol("taskState");
export const useTask = () => {
  const state = inject(taskStateKey);
  if (!state) throw new Error("key is undefined");
  return state;
};
