export type TCategory = {
  id: number;
  name: string;
};
export type TTask = {
  id: number;
  category: number;
  title: string;
  detail: string;
  error: string;
};
export type TTaskViewState = {
  // used in TaskListHeader
  categories: TCategory[];
  categoryId: number;
  taskTitle: string;
  errorSummary: string;
  // used in TaskListItems
  tasks: TTask[];
};
