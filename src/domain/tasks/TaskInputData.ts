export class TaskInputData {
  constructor(
    readonly id: number,
    readonly categoryId: number,
    readonly title: string,
    readonly detail: string
  ) {}
}
