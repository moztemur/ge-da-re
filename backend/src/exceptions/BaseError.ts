export default class BaseError extends Error {
  readonly errorData: unknown;
  constructor(message: string, errorData?: unknown) {
    super(message);
    this.errorData = errorData;
    this.name = 'BaseError';
  }
}
