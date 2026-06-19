export class CustomError extends Error {
  constructor(
    readonly message: string,
    readonly statusCode: number = 500,
  ) {
    super(message);
  }
}
