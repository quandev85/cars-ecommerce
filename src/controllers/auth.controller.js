const { authService } = require('../services');

class AuthController {
  register = async (req, res, next) => {
    return authService.register(req, res);
  };
}

module.exports = new AuthController();
