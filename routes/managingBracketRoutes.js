const express = require('express')
const router = express.Router()
const { getManagingBrackets, getManagingBracket, createManagingBracket, deleteManagingBracket, updateManagingBracket } = require('../controllers/managingBracketController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getManagingBrackets)
router.route('/').post(protect, createManagingBracket)
router.route('/:id').get(protect, getManagingBracket)
router.route('/:id').delete(protect, deleteManagingBracket).put(protect, updateManagingBracket)

module.exports = router
