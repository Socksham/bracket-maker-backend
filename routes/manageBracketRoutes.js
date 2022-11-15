const express = require('express')
const router = express.Router()
const {
  getBracket,
  setBracket,
  updateBracket,
  deleteBracket,
} = require('../controllers/manageBracketController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getBracket).post(protect, setBracket)
router.route('/:id').delete(protect, deleteBracket).put(protect, updateBracket)

module.exports = router
