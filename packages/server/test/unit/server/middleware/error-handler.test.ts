import { errorHandler } from '../../../../src/middlewares/error-handler';
import { Context } from '../../../../src/types';
import { AppError, NotFoundError } from '../../../../src/errors';

describe('errorHandler middleware', () => {
  it('Should return corresponding message and status code when AppError occurred', async () => {
    const ctx = {} as Context;
    const errorMsg = 'Test App Error';

    await errorHandler(ctx, () => {
      throw new AppError(errorMsg);
    });

    expect(ctx.status).toBe(500);
    expect(ctx.body.message).toBe(errorMsg);
  });

  it('Should return corresponding message and status code when extended from AppError error occurred', async () => {
    const ctx = {} as Context;
    const errorMsg = 'Item not found';

    await errorHandler(ctx, () => {
      throw new NotFoundError(errorMsg);
    });

    expect(ctx.status).toBe(404);
    expect(ctx.body.message).toBe(errorMsg);
  });

  it('Should return Internal Server Error when unknown error occurred', async () => {
    const ctx = {} as Context;

    await errorHandler(ctx, () => Promise.reject('Unknown error'));

    expect(ctx.status).toBe(500);
    expect(ctx.body.message).toBe('Internal Server Error');
  });
});
