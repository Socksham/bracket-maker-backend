const express = require('express')
const router = express.Router()
const {
  getPlayingBrackets,
  getPlayingBracket,
  createPlayingBracket,
  deletePlayingBracket,
  updatePlayingBracket
} = require('../controllers/playingBracketController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getPlayingBrackets)
router.route('/').post(protect, createPlayingBracket)
router.route('/:id').get(protect, getPlayingBracket)
router.route('/:id').delete(protect, deletePlayingBracket).put(protect, updatePlayingBracket)

module.exports = router
