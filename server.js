const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require('knex');
const bcrypt = require("bcrypt")
const register = require("./controller/register")
const signin = require("./controller/signin")
const profile = require("./controller/profile")
const image = require("./controller/image")

const db = knex ({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'admin',
        database : 'image-recognition'
    }
});


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {res.json("Hello")})
app.post("/signin", (req, res) => {signin.signinHandler(req, res, db, bcrypt)})
app.post("/register", (req, res) => {register.resgisterHandler(req, res, db, bcrypt)})
app.get("/profile/:id", (req, res) => {profile.profileHandler(req, res, db)})
app.put("/image", (req, res) => {image.entryHandler(req, res, db)})
app.post("/imageurl", (req, res) => {image.handleApiCall(req, res)})



app.listen(3010, () => {console.log("its running");});

/*
    /                   - GET REQUEST                   =>      return "This is home"
    /signin             - POST REQUEST (security)       =>      return "success"||"fail"
    /register           - POST REQUEST                  =>      return new Object user
    /profile/:userid    - GET REQUEST                   =>      return existing user
    /image              - PUT REQUEST                   =>      update existing user profile
*/