export default class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  register = async (req, res) => {
    try {
      const result = await this.authService.register(req.body);
      res.status(201).json(result);
    } catch (error) {
      if (error.message === 'Email already in use') {
        return res.status(409).json({ status: 'ERROR', message: error.message });
      }
      res.status(400).json({ status: 'ERROR', message: error.message });
    }
  };

  login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: 'ERROR',
        message: 'Email and password are required',
      });
    }

    try {
      const result = await this.authService.login(req.body);
      res.status(200).json(result);
    } catch (error) {
      if (error.message === 'Invalid credentials') {
        return res.status(401).json({ status: 'ERROR', message: error.message });
      }
      res.status(400).json({ status: 'ERROR', message: error.message });
    }
  };
}
