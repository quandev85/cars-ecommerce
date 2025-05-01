const { authService } = require('../services');
const AuthService = require('../services/auth.service');

class AuthController {
  static register = async (req, res, next) => {
    console.log(req.body);
    try {
      return res.status(201).json({
        code: 201,
        message: 'Register success',
        metadata: await AuthService.register(req.body),
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: error.message,
      });
    }
  };
}

module.exports = AuthController;
