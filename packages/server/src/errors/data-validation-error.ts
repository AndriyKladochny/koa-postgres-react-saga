import { AppError } from './app-error';

export class DataValidationError extends AppError {
  public readonly code = 400;
}
