const router = require("express").Router()
const Movie = require("../models/movie.model")

router.route("/").get((req, res) => {
    Movie.find()
        .then((movies) => res.json(movies))
        .catch(error => res.status(400).json("Error" + error))
})

router.route("/add").post((req, res) => {
    console.log(req.body)
    const name = req.body.name
    const url = req.body.url
    const rating = req.body.rating

    const newMovie = new Movie({name, url, rating})

    console.log("created new movie")
    console.log(newMovie)

    newMovie.save()
        .then(() => res.json("Movie Added!"))
        .catch(error => res.status(400).json("Error" + error))
})

module.exports = router