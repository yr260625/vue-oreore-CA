export class TaskTitle {
  readonly value: string;
  constructor(value: string) {
    this.validation(value);
    this.value = value;
  }
  private validation(value: string) {
    if (!value) throw new Error("The field is required");
    return value;
  }
}
