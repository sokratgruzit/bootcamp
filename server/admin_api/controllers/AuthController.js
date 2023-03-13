const AuthServices = require("../services/AuthServices");

class AuthController {
  async signup(req, res) {
    try {
      console.log(req.body);
      const user = await AuthServices.signup(req.body);
      res.status(201).json({ user: user });
    } catch (e) {
      let errors = AuthServices.handleErrors(e);
      res.status(400).json({ errors });
    }
  }

  async login(req, res) {
    try {
      console.log(req.body);
      const user = await AuthServices.login(res, req.body);
      res.status(200).json({ user: user });
    } catch (e) {
      let errors = AuthServices.handleErrors(e);
      console.log(e.message);
      res.status(400).json({ errors });
    }
  }

  logout(req, res) {
    AuthServices.logout(res);
  }
}

module.exports = new AuthController();
