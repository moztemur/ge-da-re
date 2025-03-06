import BaseError from './BaseError';

export default class NotFoundError extends BaseError {
  constructor(message: string, errorData?: unknown) {
    super(message, errorData);
    this.name = 'NotFoundError';
  }
}
