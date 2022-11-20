const mongoose = require('mongoose')

const managingBracketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    lockDate: {
      type: Date,
      required: [true, 'You need to indicate lock date']
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

module.exports = mongoose.model('ManagingBracket', managingBracketSchema)