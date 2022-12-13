import { AxiosResponse } from "axios";
import { Api } from "src/driver/axiosConfig";
import {
  ITaskInfrastructure,
  TTask,
  TCategory,
} from "src/driver/tasks/interfaces/TaskInfrastructure";

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
