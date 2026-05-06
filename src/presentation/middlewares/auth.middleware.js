import JwtService from '../../infra/security/jwt.service.js';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'ERROR',
      message: 'Unauthorized: No token or invalid token format',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = JwtService.verifyToken(token);
    req.user = payload;
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    return res.status(401).json({
      status: 'ERROR',
      message: 'Unauthorized: Invalid token',
    });
  }
};
