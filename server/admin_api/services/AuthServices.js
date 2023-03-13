const User = require("../models/User");
const Role = require("../models/Role");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

class AuthServices {
  handleErrors(err) {
    let errors = { email: "", password: "" };

    // incorrect email
    if (err.message === "incorrect email") {
      errors.email = "That email is not registered";
    }

    // incorrect password
    if (err.message === "incorrect password") {
      errors.password = "That password is incorrect";
    }

    /*dublicate error*/
    if (err.code === 11000) {
      errors.email = "That email is already registered";
      return errors;
    }
    /*validation errors*/
    if (err.message.includes("users validation failed")) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }

    return errors;
  }

  // create json web token
  maxAge() {
    //day * hours * minutes * seconds
    return 3 * 60 * 60;
  }

  createToken(id, roles) {
    const payload = {
      id,
      roles,
    };
    const token = jwt.sign(payload, secret, {
      expiresIn: this.maxAge(),
    });
    return token;
  }

  async signup(user) {
    const userRole = await Role.findOne({ value: "ADMIN" });
    const createdUser = await User.create({ ...user, roles: [userRole.value] });
    return createdUser;
  }

  async login(res, user) {
    const loginedUser = await User.login(user);
    const token = this.createToken(loginedUser._id, loginedUser.roles);
    res.cookie("server_user", token, {
      httpOnly: true,
      maxAge: this.maxAge() * 1000,
    });
    return loginedUser;
  }

  logout(res) {
    res.cookie("user", "", { maxAge: 1 });
  }
}

module.exports = new AuthServices();
