const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    managingBracket: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'ManageBracket',
    },
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    locked: {
      type: Boolean,
      required: [true, 'Please add an email']
    },
    bracket: {
      type: String,
      required: [true, 'You need a bracket'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('PlayingBracket', userSchema)