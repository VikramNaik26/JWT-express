// check username password in post(login) request
// if exists create a new JWT
// send back to frontend

const jwt = require('jsonwebtoken')
const CustomAPIError = require("../errors/custom-error");

// set up authentication so only the request with JWT can access the dashboard

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  // mongo
  // Joi
  // check in controler

  if (!username || !password) {
    throw new CustomAPIError("please provide a username and password", 400);
  }

  const token = jwt.sign({
    
  })

  res.send("Fake login/Register/Signup");
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: "Hello Vikram",
    secret: `Here is your authorized data, your luckey number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
