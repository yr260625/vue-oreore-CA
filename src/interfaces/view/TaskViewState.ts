export type TCategoryView = {
  id: number;
  name: string;
};
export type TTaskView = {
  id: number;
  category: number;
  title: string;
  detail: string;
  error?: string;
};
export interface ITaskViewState {
  // used in TaskListHeader
  categories: TCategoryView[];
  categoryId: number;
  taskTitle: string;
  errorSummary: string;
  // used in TaskListItems
  tasks: TTaskView[];
}
