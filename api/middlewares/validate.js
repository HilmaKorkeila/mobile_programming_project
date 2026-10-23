// Middleware for validating 'project', 'task' and 'expenses' tables using zod
export const validate = (schema) => async (req, res, next) => {
  try {
    const validatedData = await schema.parseAsync({
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
    });

    // Replace req properties with sanitized/parsed data (applies defaults, trims, etc.)
    if (validatedData.body) req.body = validatedData.body;
    if (validatedData.params) req.params = validatedData.params;
    if (validatedData.query) req.query = validatedData.query;

    return next();
  } catch (error) {
    return res.status(400).json({
      error: 'Validation failed',
      details: error.errors.map((err) => ({
        field: err.path.slice(1).join('.'), // Removes root 'body' or 'params' prefix
        location: err.path[0], // 'body', 'params', etc.
        message: err.message,
      })),
    });
  }
};
