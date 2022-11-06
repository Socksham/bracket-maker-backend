const mongoose = require("mongoose")

const Schema = mongoose.Schema

const movieSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        }
    }, {
        timestamps: true
    }
)

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie