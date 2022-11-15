const asyncHandler = require('express-async-handler')

const Bracket = require('../models/userBracketModel')
const User = require('../models/userModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getBrackets = asyncHandler(async (req, res) => {
    const bracket = await Bracket.find({ user: req.user.id })

    res.status(200).json(bracket)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setBracket = asyncHandler(async (req, res) => {
    if (!req.body.bracket) {
        res.status(400)
        throw new Error('Please add a bracket')
    }

    const bracket = await Bracket.create({
        bracket: req.body.bracket,
        user: req.user.id,
    })

    res.status(200).json(bracket)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateBracket = asyncHandler(async (req, res) => {
    const bracket = await Bracket.findById(req.params.id)

    if (!bracket) {
        res.status(400)
        throw new Error('Bracket not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if (bracket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedBracket = await Bracket.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updateBracket)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteBracket = asyncHandler(async (req, res) => {
    const bracket = await Bracket.findById(req.params.id)

    if (!bracket) {
        res.status(400)
        throw new Error('Bracket not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if (bracket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await bracket.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getBrackets,
    setBracket,
    updateBracket,
    deleteBracket,
}
