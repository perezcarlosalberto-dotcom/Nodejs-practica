export const loggerMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] Method: ${req.method} | URL: ${req.url}`);
    next();
  };