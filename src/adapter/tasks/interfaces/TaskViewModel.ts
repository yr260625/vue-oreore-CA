export class TaskViewModel {
  constructor(
    public categories: TCategoryView[] = [],
    public categoryId = 0,
    public taskTitle = "",
    public errorSummary = "",
    public tasks: TTaskView[] = []
  ) {}
}

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
