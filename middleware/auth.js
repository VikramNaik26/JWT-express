const jwt = require('jsonwebtoken')
// const CustomAPIError = require('../errors/custom-error')
const { UnAuthenticatedError } = require('../errors/index')

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // throw new CustomAPIError('No token provided', 401)
    throw new UnAuthenticatedError('No token provided')
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { id, username } = decoded
    req.user = { id, username }
    next()
    // console.log(decoded)
  } catch (error) {
    /*  throw new CustomAPIError('Not Authorized to access this route', 401) */
    throw new UnAuthenticatedError('Not Authorized to access this route')
  }

  //   console.log(req.headers.authorization)
}

module.exports = authenticationMiddleware
