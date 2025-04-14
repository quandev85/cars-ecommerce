class AuthService {
  register = (req, res, next) => {
    // TODO: Implement register logic
    res.send('Register');
  };

  login = (req, res, next) => {
    // TODO: Implement login logic
    res.send('Login');
  };
}

module.exports = new AuthService();
