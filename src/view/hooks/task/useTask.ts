import { ITaskApiRepository } from "@/interfaces/infrastructure/TaskApiRepository";
import { ITaskPresenter } from "@/interfaces/presenter/TaskPresenter";
import { ITaskRepository } from "@/interfaces/repository/TaskRepository";
import { ITaskUseCase } from "@/interfaces/usecase/TaskUseCase";
import { TaskController } from "@/controllers/TaskController";
import { TaskApiRepository } from "@/infrastructure/TaskApiRepository";
import { TTaskViewState } from "@/interfaces/view/TaskView";
import { TaskPresenter } from "@/presenters/TaskPresenter";
import { TaskRepository } from "@/repositories/TaskRepository";
import { TaskUseCase } from "@/usecases/TaskUseCase";
import { InjectionKey, reactive, inject } from "vue";

// dependency injection
const getTaskController = (state: TTaskViewState): TaskController => {
  const apiRepository: ITaskApiRepository = new TaskApiRepository();
  const repository: ITaskRepository = new TaskRepository(apiRepository);
  const presenter: ITaskPresenter = new TaskPresenter(state);
  const usecase: ITaskUseCase = new TaskUseCase(repository, presenter);
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
