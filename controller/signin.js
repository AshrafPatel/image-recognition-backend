const signinHandler = (req, res, db, bcrypt) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json("Error user not found")
    }
    db.select("email", "hash").from("login")
        .where("email", "=", email)
        .then(data => {
            try {
                const isValid = bcrypt.compareSync(password, data[0].hash);
                if (isValid) {
                    try {
                        return db.select("*").from("users")
                        .where("email", "=", email)
                        .then(userData => {
                            res.json(userData[0])
                        })
                    } catch {
                        return res.status(400).json("Error could not fetch user")
                    }
                }
            } catch {
                res.status(401).json("Error user not found")
            } 
        })
}

module.exports = {
    signinHandler: signinHandler
}