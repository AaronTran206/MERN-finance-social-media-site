import User from "../models/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const signIn = async (req, res) => {
  const { email, password } = req.body

  try {
    //find user that matches email in request
    const existingUser = await User.findOne({ email })

    //no user that matches that email?
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." })

    //compare sent password and existing password in database
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    )

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Password" })

    //create jwt expires in specified time
    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      "account",
      { expiresIn: "1hr" }
    )

    //successful signin
    res.status(200).json({ result: existingUser, token })
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" })
  }
}

export const signUp = async (req, res) => {
  const { email, password, confirmPassword, given_name, family_name } = req.body

  try {
    //already an account?
    const existingUser = await User.findOne({ email })
    if (existingUser)
      return res
        .status(400)
        .json({ message: "An account already made with this email." })

    //password and confirm password don't match?
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match" })

    //hash password to make site more secure
    const hashedPassword = await bcrypt.hash(password, 12)

    //result object to send to frontend
    const result = await User.create({
      email,
      password: hashedPassword,
      given_name: given_name,
      family_name: family_name,
    })

    //jwt that expires in specified amount of time
    const token = jwt.sign(
      {
        email: result.email,
        id: result._id,
      },
      "account",
      {
        expiresIn: "1hr",
      }
    )

    //successful signup
    res.status(200).json({ result, token })
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" })
  }
}
