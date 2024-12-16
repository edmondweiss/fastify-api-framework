import { z } from "zod";

export const serverErrorSchema = z.object({
  code: z.string().min(1).optional(),
  message: z.string().min(1),
  details: z.record(z.string(), z.any()).optional(),
});

export type ServerError = z.infer<typeof serverErrorSchema>;

export const serverErrorResponseSchema = z.object({
  error: z.intersection(
    serverErrorSchema,
    z.object({
      errors: z.array(serverErrorSchema).optional(),
    }),
  ),
});

export type ServerErrorResponse = z.infer<typeof serverErrorResponseSchema>;

export const createDefaultResponseSchema = (
  successSchema: Record<string, any>,
) => {
  return {
    "2xx": successSchema,
    // TODO: What is the correct response schema for 3xx?
    // "3xx": errorSchema,
    "4xx": serverErrorResponseSchema,
    "5xx": serverErrorResponseSchema,
  };
};
