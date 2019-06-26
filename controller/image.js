const Clarifai = require("clarifai");

const app = new Clarifai.App({
    apiKey: "bf7c69b8b3f14e19b07d70cfe2bddf82"
});

const handleApiCall = (req, res) => {
    try {
        app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data)
        })
    } catch {
        res.status(404).json("Error, API was not able to provide a response")
    }
}

const entryHandler = (req, res, db) => {
    const {id} = req.body;
    try {
        db("users").where('id', '=', id)
        .increment("entries", 1)
        .returning("entries")
        .then(entries => {
            res.json(entries[0])
        })
    }
    catch {
        res.status(404).json("Error, not found")
    }
}

module.exports = {
    entryHandler: entryHandler,
    handleApiCall: handleApiCall
}