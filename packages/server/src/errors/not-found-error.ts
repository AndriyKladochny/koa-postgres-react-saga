import { AppError } from './app-error';

export class NotFoundError extends AppError {
  public readonly code = 404;
}
