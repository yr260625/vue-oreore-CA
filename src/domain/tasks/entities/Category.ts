import { CategoryName } from "src/domain/tasks/entities/vo/CategoryName";

export class Category {
  constructor(readonly id: number, readonly name: CategoryName) {}

  static create(id: number, name: string) {
    return new Category(id, new CategoryName(name));
  }
}
