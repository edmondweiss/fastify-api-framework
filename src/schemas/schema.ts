const errorSchema = {
  $id: "error-schema",
  type: "object",
  properties: {
    errors: {
      type: "array",
      items: {
        type: "object",
        properties: {
          message: { type: "string" },
          displayMessage: { type: "string" },
          code: { type: "string" },
        },
        required: ["message"],
      },
    },
  },
};

export const createResponseSchema = (successSchema: Record<string, any>) => {
  return {
    "2xx": successSchema,
    // TODO: What is the correct response schema for 3xx?
    // "3xx": errorSchema,
    "4xx": errorSchema,
    "5xx": errorSchema,
  };
};
