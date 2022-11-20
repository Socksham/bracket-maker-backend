const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token

  console.log(req.headers)

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    console.log("IF THROUGH")
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      console.log("DECODED: " + decoded)

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  console.log("TOKEN IN MIDDLEWARE " + token)

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }
