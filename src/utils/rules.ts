export const rules = {
  required: (message: string = 'Field is required') => ({
    required: true,
    message,
  }),
};