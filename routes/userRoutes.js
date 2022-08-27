import express from "express"
import bcrypt from "bcryptjs"
const router = express.Router()
import User from "../schema/Userschema.js"
import jwt from "jsonwebtoken"
import e from "express"

const validUser = async (req, res, next ,err) => {
    const token = await req.header('auth')
    if(token) {
        res.status(200).json(token)
    }
    else{
        res.status(400).json("No")
    }
}


// Register
router.post("/register", async (req, res) => {
    try {
        const userFound = await User.findOne({ email: req.body.email })
        if (userFound) {
            res.status(400).json("User Already Register")
        }
        else {
            const salt = bcrypt.genSaltSync(11)
            const hash = bcrypt.hashSync(req.body.password, salt)
            const newUser = new User({
                // ...req.body,
                username : req.body.username,
                email : req.body.email,
                password: hash
            })
            const userData = await newUser.save();
            const { password, ...others } = userData._doc
            res.status(200).json(others)
        }


    } catch (err) {
        res.status(500).json(err);
    }
})




//Login 
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const compare = bcrypt.compareSync(req.body.password, user.password)
            if (compare) {
                const token = jwt.sign({ id: user._id }, process.env.SECRET)
                const { password, ...others } = user._doc
                // const da =[ others, token ]
                res.header("auth", token).json(others)
            }
            else {

                return res.status(400).json("Wrong passwaord")

            }
        }
        else {
            return res.status(400).json("Email Not Found")
        }
    } catch (err) {
        return res.status(500).json(err)

    }
})











export default router

