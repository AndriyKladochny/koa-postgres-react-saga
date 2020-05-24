import * as Joi from '@hapi/joi';
import { validate } from '../../../../src/middlewares';
import { Context } from '../../../../src/types';
import { DataValidationError } from '../../../../src/errors';

describe('validate middleware', () => {
  const nextMock = jest.fn(() => Promise.resolve());

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should not throw error when body is valid', async () => {
    const bodySchema = Joi.object({
      request: Joi.object({
        body: Joi.object({
          title: Joi.string().required(),
        }),
      }).unknown(true),
    }).unknown(true);

    const ctx = {
      request: {
        body: { title: 'Test title' },
      },
      response: {},
    } as Context;

    const validateMiddleware = validate(bodySchema);

    expect.assertions(1);

    await validateMiddleware(ctx, nextMock);

    expect(nextMock.mock.calls.length).toBe(1);
  });

  it('Should throw DataValidationError when body is not valid', async () => {
    const bodySchema = Joi.object({
      request: Joi.object({
        body: Joi.object({
          title: Joi.string().required(),
        }),
      }).unknown(true),
    }).unknown(true);

    const ctx = {
      request: {
        body: {},
      },
    } as Context;

    const validateMiddleware = validate(bodySchema);

    expect.assertions(2);

    await expect(() => validateMiddleware(ctx, nextMock)).toThrowError(
      DataValidationError
    );

    expect(nextMock.mock.calls.length).toBe(0);
  });
});
