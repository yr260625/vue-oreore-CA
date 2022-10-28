import { AxiosResponse } from "axios";
import axios from "@/infrastructure/axios/config";
import {
  ITaskApiRepository,
  saveItem,
  updateItem,
} from "@/interfaces/infrastructure/TaskApiRepository";
import { TCategory, TTask } from "@/interfaces/view/TaskView";

export class TaskApiRepository implements ITaskApiRepository {
  async findAll(): Promise<TTask[]> {
    const res: AxiosResponse<TTask[]> = await axios.get<TTask[]>("/task/");
    return res.data;
  }

  async save(task: saveItem): Promise<TTask> {
    const res: AxiosResponse<TTask> = await axios.post<TTask>("/task/", task);
    return res.data;
  }

  async update(task: updateItem): Promise<TTask> {
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
