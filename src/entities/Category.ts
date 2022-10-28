import { CategoryName } from "@/entities/vo";
export class Category {
  constructor(readonly id: number, readonly name: CategoryName) {}
}
