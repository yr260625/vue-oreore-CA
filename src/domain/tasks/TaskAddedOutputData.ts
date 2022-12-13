export class TaskAddedOutputData {
  constructor(
    readonly id: number = 0,
    readonly categoryId: number,
    readonly title: string = "",
    readonly detail: string = ""
  ) {}
}
