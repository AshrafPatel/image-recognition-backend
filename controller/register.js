const resgisterHandler = (req, res, db, bcrypt) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).json("Error cannot sign up")
    }
    const hash = bcrypt.hashSync(password, 10);
    db.transaction(trx => {                     //Transaction made
        try {
            trx.insert({                        //trx used instead database
            hash: hash,
            email: email 
            })
            .into("login")
            .returning("email")                 //returning email to use again
            .then(loginEmail => {
                return trx("users")
                .returning("*")
                .insert({
                    name: name,
                    email: loginEmail[0],
                    joined: new Date()
                })
                .into("users")
                .then(user => {
                    res.json(user[0])
                })
            })
            .then(trx.commit)
        }   
        catch {
            trx.rollback
            res.status(400).json("Error cannot sign up")
        }
    })
}

module.exports = {
    resgisterHandler: resgisterHandler
}