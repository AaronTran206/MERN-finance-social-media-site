import React, { useState } from "react"
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  createTheme,
} from "@mui/material"

import {
  GoogleLogin,
  GoogleLoginProps,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  //@ts-ignore
} from "react-google-login"

//@ts-ignore
import { decodeToken } from "react-jwt"
import { useDispatch } from "react-redux"
// import { setAuthSlice, signup, signin } from "../../slices/authSlice.js"
import { useNavigate } from "react-router-dom"
import { LockOutlined } from "@mui/icons-material"
import Input from "./Input"
import useStyles from "./styles"

interface InitialFormState {
  given_name: string
  family_name: string
  email: string
  password: string
  confirmPassword: string
}

interface GoogleSuccess {
  clientId: string
  credential: string
}

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
  const [isSignedUp, setIsSignedUp] = useState<Boolean>(true)
  const [showPassword, setShowPassword] = useState<Boolean>(false)
  const [formData, setFormData] = useState<InitialFormState>(initialState)

  const classes = useStyles({})

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

  const handleSubmit = () => {}

  //google login success
  const googleSuccess = async (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    //decode the response from Google authentication
    // const decodedToken = await decodeToken(res.credential)
    console.log(res)

    // //dispatch decoded results to redux global state
    // dispatch(setAuthSlice({ result: decodedToken, token: res.credential }))
  }

  //google login failure
  const googleFailure = (error: GoogleLoginProps) => {
    console.log(error)
  }

  return (
    <Container component={"main"} maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">
          {isSignedUp ? "Sign In" : "Sign Un"}
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
                />
                <Input
                  name="family_name"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
              autoFocus
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {!isSignedUp && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
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
          <GoogleLogin
            clientId="1047237805781-hg48pcherdr1v5b8dvs56o1q05vullp4.apps.googleusercontent.com"
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            theme="light"
            className={classes.googleButton}
          />
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
