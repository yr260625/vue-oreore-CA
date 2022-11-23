import { TaskViewModel } from "src/adapter/tasks/interfaces/TaskViewModel";
import { TaskControllerFactory } from "src/adapter/tasks/TaskControllerFactory";
import { reactive, InjectionKey, inject } from "vue";
import { TaskView } from "./TaskView";

// provided state in task components
export const taskState = () => {
  // states
  const taskViewModel = reactive<TaskViewModel>(new TaskViewModel());

  // controller
  const controller = new TaskControllerFactory(
    new TaskView(taskViewModel)
  ).create();

  return {
    taskViewModel,
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
