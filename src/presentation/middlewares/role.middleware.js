export const roleMiddleware = (rolesPermitted) => {
  return (req, res, next) => {
    if (!rolesPermitted.includes(req.user.role)) {
      return res.status(403).json({
        status: 'ERROR',
        message: 'Forbidden: You are not authorized to access this resource',
      });
    }
    next();
  };
};
