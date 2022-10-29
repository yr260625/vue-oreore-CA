import { AxiosResponse } from "axios";
import axios from "@/infrastructure/axios/config";
import {
  ITaskInfrastructure,
  TCategory,
  TTask,
} from "@/interfaces/infrastructure/ITaskInfrastructure";

export class TaskApi implements ITaskInfrastructure {
  async findAll(): Promise<TTask[]> {
    const res: AxiosResponse<TTask[]> = await axios.get<TTask[]>("/task/");
    return res.data;
  }

  async save(task: TTask): Promise<TTask> {
    const res: AxiosResponse<TTask> = await axios.post<TTask>("/task/", task);
    return res.data;
  }

  async update(task: TTask): Promise<TTask> {
    const res: AxiosResponse<TTask> = await axios.put<TTask>(
      `/task/${task.id}/`,
      task
    );
    return res.data;
  }

  async deleteById(id: number): Promise<void> {
    axios.delete(`/task/${id}`);
  }

  async findAllCategories(): Promise<TCategory[]> {
    const res: AxiosResponse<TCategory[]> = await axios.get<TCategory[]>(
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
