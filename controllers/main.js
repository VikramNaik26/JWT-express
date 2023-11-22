// check username password in post(login) request
// if exists create a new JWT
// send back to frontend

const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')

// set up authentication so only the request with JWT can access the dashboard

const login = async (req, res) => {
  const { username, password } = req.body
  console.log(username, password)

  // mongo
  // Joi
  // check in controler

  if (!username || !password) {
    throw new CustomAPIError('please provide a username and password', 400)
  }
  // just for demo in production use long, complex and unguesable string values!!!!!!!!!
  // try to keep payload small, better experience for users
  const id = new Date().getDate()

  const token = jwt.sign(
    {
      id,
      username,
    }, // payload
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  )

  // res.send("Fake login/Register/Signup");
  res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100)
  res.status(200).json({
    msg: 'Hello Vikram',
    secret: `Here is your authorized data, your luckey number is ${luckyNumber}`,
  })
}

module.exports = {
  login,
  dashboard,
}
