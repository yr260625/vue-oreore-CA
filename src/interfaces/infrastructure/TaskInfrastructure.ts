export interface ITaskInfrastructure {
  findAll(): Promise<TTask[]>;
  save(task: TTask): Promise<TTask>;
  update(task: TTask): Promise<TTask>;
  deleteById(id: number): Promise<any>;
  findAllCategories(): Promise<TCategory[]>;
}

export type TTask = {
  id: number;
  category: number;
  title: string;
  detail: string;
};

export type TCategory = {
  id: number;
  name: string;
};
