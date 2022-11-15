const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    locked: {
      type: Boolean,
      required: [true, 'Please add an email']
    },
    bracket: {
      type: String,
      required: [true, 'You need a bracket'],
    },
    name: {
      type: String,
      required: [true, 'You need a bracket name'],
    },
    joinCode: {
      type: String,
      required: [true, 'You need a bracket join code'],
      unique: true,
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('ManageBracket', userSchema)