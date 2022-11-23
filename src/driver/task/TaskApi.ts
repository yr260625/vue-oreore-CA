import { AxiosResponse } from "axios";
import { Api } from "../axiosConfig";
import {
  ITaskInfrastructure,
  TTask,
  TCategory,
} from "./interface/TaskInfrastructure";

export class TaskApi implements ITaskInfrastructure {
  async findAll(): Promise<TTask[]> {
    const res: AxiosResponse<TTask[]> = await Api.get<TTask[]>("/task/");
    return res.data;
  }

  async save(task: TTask): Promise<TTask> {
    const res: AxiosResponse<TTask> = await Api.post<TTask>("/task/", task);
    return res.data;
  }

  async update(task: TTask): Promise<TTask> {
    const res: AxiosResponse<TTask> = await Api.put<TTask>(
      `/task/${task.id}/`,
      task
    );
    return res.data;
  }

  async deleteById(id: number): Promise<void> {
    Api.delete(`/task/${id}`);
  }

  async findAllCategories(): Promise<TCategory[]> {
    const res: AxiosResponse<TCategory[]> = await Api.get<TCategory[]>(
      "/category/"
    );
    return res.data;
  }
}

const test = [
  { id: 1, name: "category1" },
  { id: 2, name: "category2" },
  { id: 3, name: "category3" },
];
