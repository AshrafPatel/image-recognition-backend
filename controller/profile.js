const profileHandler = (req, res, db) => {
    const {id} = req.params;
    db("users").where({
        id: id
    })
    .then(data => {
        if (data.length) {
            res.json(data[0])
        } else {
            res.status(404).json("Error, not found")
        }
    })
}

module.exports = {
    profileHandler: profileHandler
}