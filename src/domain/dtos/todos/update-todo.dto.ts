export class UpdateTodoDto {
  private constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly completeadAt?: Date,
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};
    if (this.text) {
      returnObj.text = this.text;
    }
    if (this.completeadAt) {
      returnObj.completedAt = this.completeadAt;
    }
    return returnObj;
  }

  static update(props: {
    [key: string]: any;
  }): [string | undefined, UpdateTodoDto | undefined] {
    const { id, text, completedAt } = props;
    if (!id || isNaN(Number(id))) {
      return ["Id must be a valid number", undefined];
    }
    let newCompletedAt = completedAt;
    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (newCompletedAt.toString() === "Invalid Date") {
        return ["CompletedAt is invalid", undefined];
      }
    }

    return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
  }
}
