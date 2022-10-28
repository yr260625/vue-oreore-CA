export interface ITaskUseCase {
  initTaskView(): Promise<void>;
  addTask(categoryId: number, title: string): Promise<void>;
  updateTask(
    taskId: number,
    categoryId: number,
    title: string,
    detail: string
  ): Promise<void>;
  deleteTask(id: number): Promise<void>;
}
