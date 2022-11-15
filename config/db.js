const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://ConantBracket:IRcqIcI6Ls1SpwR5@cluster0.kyaz1f1.mongodb.net/?retryWrites=true&w=majority")

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB
