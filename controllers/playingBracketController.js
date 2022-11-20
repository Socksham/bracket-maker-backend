const asyncHandler = require('express-async-handler')

const PlayingBracket = require('../models/playingBracketModel')
const User = require('../models/userModel')
const ManagingBracket = require('../models/managingBracketModel')

const getPlayingBrackets = asyncHandler(async (req, res) => {
    const brackets = await PlayingBracket.find({ user: { $eq: req.user.id } })
    console.log("GETTING PLAYING BRACKETS")
    console.log(brackets)
    res.status(200).json(brackets)
})

const getPlayingBracket = asyncHandler(async (req, res) => {
    console.log("HANDLER: " + req.params)
    const bracket = await PlayingBracket.findById(req.params.id)

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
    res.status(200).json(bracket)
})

const createPlayingBracket = asyncHandler(async (req, res) => {
    console.log(req.body)
    if (!req.body.joinCode) {
        res.status(400)
        throw new Error('Please add a join code')
    }
    console.log("GET MANAGING")
    const managingBracket = await ManagingBracket.findOne({ joinCode: req.body.joinCode })
    console.log("managing: " + managingBracket)

    if (managingBracket === null) {
        res.status(400)
        throw new Error('Invalid join code')
    }
    console.log("CREATING")
    const bracket = await PlayingBracket.create({
        bracket: managingBracket.bracket,
        managingBracket: managingBracket.id,
        user: req.user.id,
        name: managingBracket.name,
    })

    res.status(200).json(bracket)
})

const updatePlayingBracket = asyncHandler(async (req, res) => {
    const bracket = await PlayingBracket.findById(req.params.id)

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

    // const updatedBracket = await PlayingBracket.updateOne(req.params.id, req.body, {
    //     new: true,
    // })

    bracket.update({ $set: { bracket: req.body.bracket } }, newvalues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
    })

    const updatedBracket = await PlayingBracket.updateOne({ $set: { bracket: req.body.bracket } })

    res.status(200).json(updatedBracket)
})

const deletePlayingBracket = asyncHandler(async (req, res) => {
    const bracket = await PlayingBracket.findById(req.params.id)

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
    getPlayingBrackets,
    getPlayingBracket,
    createPlayingBracket,
    deletePlayingBracket,
    updatePlayingBracket
}
