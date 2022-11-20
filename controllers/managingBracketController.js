const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const ManagingBracket = require('../models/managingBracketModel')

const getManagingBrackets = asyncHandler(async (req, res) => {
    const brackets = await ManagingBracket.find({ user: { $eq: req.user.id } })
    console.log("GETTING MANAGING BRACKETS")
    console.log(brackets)
    res.status(200).json(brackets)
})

const getManagingBracket = asyncHandler(async (req, res) => {
    const bracket = await ManagingBracket.findById(req.params.id)

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

const createManagingBracket = asyncHandler(async (req, res) => {
    console.log(req.body)
    // if (!req.body.joinCode) {
    //     res.status(400)
    //     throw new Error('Please add a join code')
    // }
    // console.log("CREATING")
    // console.log("managing: " + managingBracket)

    // if(managingBracket === null){
    //     res.status(400)
    //     throw new Error('Invalid join code')
    // }

    var code = Math.floor(1000 + Math.random() * 9000);

    let managingBracket = await ManagingBracket.findOne({code})

    while(managingBracket !== null){
        var code = Math.floor(1000 + Math.random() * 9000);
        managingBracket = await ManagingBracket.findOne({code})
    }

    const bracket = await ManagingBracket.create({
        bracket: '[{"title":"Round of 16","seeds":[{"id":1,"date":"Wed Nov 16 2022","teams":[{"name":"England"},{"name":"America"}]},{"id":2,"date":"Wed Nov 16 2022","teams":[{"name":"Mexico"},{"name":"India"}]},{"id":3,"date":"Wed Nov 16 2022","teams":[{"name":"Germany"},{"name":"France"}]},{"id":4,"date":"Wed Nov 16 2022","teams":[{"name":"Guatemala"},{"name":"South Korea"}]},{"id":5,"date":"Wed Nov 16 2022","teams":[{"name":"West Indies"},{"name":"Qatar"}]},{"id":6,"date":"Wed Nov 16 2022","teams":[{"name":"South Africa"},{"name":"West Africa"}]},{"id":7,"date":"Wed Nov 16 2022","teams":[{"name":"Netherlands"},{"name":"Antarctica"}]},{"id":8,"date":"Wed Nov 16 2022","teams":[{"name":"New Zealand"},{"name":"Australia"}]}]},{"title":"Round of 8","seeds":[{"id":9,"date":"Wed Nov 16 2022","teams":[{"name":"England"},{"name":"India"}]},{"id":10,"date":"Wed Nov 16 2022","teams":[{"name":"France"},{"name":"South Korea"}]},{"id":11,"date":"Wed Nov 16 2022","teams":[{"name":"Qatar"},{"name":"South Africa"}]},{"id":12,"date":"Wed Nov 16 2022","teams":[{"name":"Netherlands"},{"name":"Australia"}]}]},{"title":"Final 4","seeds":[{"id":13,"date":"Wed Nov 16 2022","teams":[{"name":"India"},{"name":"America"}]},{"id":14,"date":"Wed Nov 16 2022","teams":[{"name":"Qatar"},{"name":"Netherlands"}]}]},{"title":"Championship","seeds":[{"id":15,"date":"Wed Nov 16 2022","teams":[{"name":"India"},{"name":"Qatar"}]}]}]',
        user: req.user.id,
        joinCode: code,
        name: req.body.bracketName,
        lockDate: req.body.lockDate
    })

    res.status(200).json(bracket)
})

const updateManagingBracket = asyncHandler(async (req, res) => {
    const bracket = await ManagingBracket.findById(req.params.id)

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

    const updatedBracket = await ManagingBracket.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedBracket)
})

const deleteManagingBracket = asyncHandler(async (req, res) => {
    const bracket = await ManagingBracket.findById(req.params.id)

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
    getManagingBrackets,
    getManagingBracket,
    createManagingBracket,
    deleteManagingBracket,
    updateManagingBracket
}
