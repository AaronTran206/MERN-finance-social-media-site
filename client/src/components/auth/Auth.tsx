import React, { useState } from "react"
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  createTheme,
  FormHelperText,
} from "@mui/material"

import { GoogleLogin, CredentialResponse } from "@react-oauth/google"

//@ts-ignore
import { decodeToken } from "react-jwt"
import { setAuthSlice, signUp, signIn } from "../../slices/authSlice"
import { useAppDispatch } from "../utils/reduxHooks"
import { useNavigate } from "react-router-dom"
import { LockOutlined } from "@mui/icons-material"
import Input from "./Input"
import useStyles from "./styles"
import { InitialFormState } from "../utils/interfaces"
//@ts-ignore

const initialState = {
  given_name: "",
  family_name: "",
  email: "",
  password: "",
  confirmPassword: "",
}

//for styling MUI button. MUI button does not take className as props
const theme = createTheme()

const Auth: React.FC<{}> = ({}) => {
  const [isSignedUp, setIsSignedUp] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState<boolean>(false)
  const [formData, setFormData] = useState<InitialFormState>(initialState)
  const darkMode = JSON.parse(localStorage.getItem("darkMode")!)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const classes = useStyles()
  const theme = createTheme()

  //switch form mode from signed up or not signed up
  const switchMode = () => {
    setIsSignedUp(!isSignedUp)
    setShowPassword(false)
  }

  //change form field values on key press
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  //change password visibility state
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = (e: any) => {
    //stop form from being removed from page while browser processing event
    e.preventDefault()

    //if user is already signed up, sign in
    if (isSignedUp) {
      dispatch(signIn(formData)).then(() => {
        navigate("/home")
        navigate(0)
      })
    }

    //if user is not signed up yet, sign up
    if (!isSignedUp) {
      console.log(formData.password === formData.confirmPassword)

      if (formData.confirmPassword === formData.password) {
        setPasswordError(false)
      }

      if (formData.confirmPassword !== formData.password) {
        setPasswordError(true)
      }

      if (
        formData.email.includes("@") &&
        formData.confirmPassword === formData.password
      ) {
        dispatch(signUp(formData)).then(() => {
          setIsSignedUp(true)
          clear()
        })
      }
    }
  }

  //google login success
  const googleSuccess = async (res: CredentialResponse) => {
    if (res.credential) {
      //decode the response from Google authentication
      const decodedToken = await decodeToken(res.credential)

      //dispatch decoded results to redux global state
      dispatch(setAuthSlice({ result: decodedToken, token: res.credential }))

      navigate("/home")
      navigate(0)
    }
  }

  //google login failure
  const googleFailure = () => {
    console.log("Google Login Failed")
  }

  const clear = () => {
    setFormData({
      given_name: "",
      family_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
  }

  return (
    <Container maxWidth="xs" className={classes.container}>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">
          {isSignedUp ? "Sign In" : "Sign Up"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {!isSignedUp && (
              <>
                <Input
                  name="given_name"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                  value={formData.given_name}
                />
                <Input
                  name="family_name"
                  label="Last Name"
                  handleChange={handleChange}
                  value={formData.family_name}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
              value={formData.email}
              autoFocus
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              passwordError={passwordError}
              value={formData.password}
            />
            {!isSignedUp && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
                passwordError={passwordError}
                describedby="error-text"
                value={formData.confirmPassword}
              />
            )}
          </Grid>
          <Button
            sx={{
              margin: theme.spacing(3, 0, 1.5),
            }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {isSignedUp ? "Sign In" : "Sign Up"}
          </Button>
          <Grid
            item
            sx={{
              marginBottom: theme.spacing(3),
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <GoogleLogin
              onSuccess={googleSuccess}
              onError={googleFailure}
              cancel_on_tap_outside={true}
              theme={darkMode === false ? "filled_blue" : "outline"}
            />
          </Grid>

          <Grid container justifyContent="flex-start">
            <Grid item>
              <Button onClick={switchMode}>
                {!isSignedUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth
