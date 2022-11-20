const mongoose = require('mongoose')

const playingBracketSchema = mongoose.Schema(
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
    // locked: {
    //   type: Boolean,
    //   required: [true, 'Please add lock status']
    // },
    bracket: {
      type: String,
      required: [true, 'You need a bracket'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('PlayingBracket', playingBracketSchema)