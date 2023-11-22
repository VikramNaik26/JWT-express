// check username password in post(login) request
// if exists create a new JWT
// send back to frontend

const jwt = require('jsonwebtoken')
const { BadRequest } = require('../errors/index')

// set up authentication so only the request with JWT can access the dashboard

const login = async (req, res) => {
  const { username, password } = req.body
  // console.log(username, password)

  // mongo
  // Joi
  // check in controler

  if (!username || !password) {
    // throw new CustomAPIError('please provide a username and password', 400)
    throw new BadRequest('please provide a username and password')
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
  /*  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('No token provided', 401)
  }

  const token = authHeader.split(' ')[1] */
  // console.log(token)

  /*  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // console.log(decoded)
    const luckyNumber = Math.floor(Math.random() * 100)

    res.status(200).json({
      msg: `Hello ${decoded.username}`,
      secret: `Here is your authorized data, your luckey number is ${luckyNumber}`,
    })
  } catch (error) {
    throw new CustomAPIError('Not Authorized to access this route', 401)
  } */

  console.log(req.user)
  const luckyNumber = Math.floor(Math.random() * 100)

  res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret: `Here is your authorized data, your luckey number is ${luckyNumber}`,
  })
}

module.exports = {
  login,
  dashboard,
}
