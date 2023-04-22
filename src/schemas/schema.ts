import { TObject } from "@sinclair/typebox";

export const createResponseSchema = (successSchema: TObject) => {
  return {
    200: successSchema,
  };
};
