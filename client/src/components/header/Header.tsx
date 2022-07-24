import React, { useEffect, useState } from "react"
import { AppBar, Toolbar, Button, Avatar } from "@mui/material"
import { googleLogout } from "@react-oauth/google"
import { useAppDispatch } from "../utils/reduxHooks"
import { useNavigate, useLocation } from "react-router-dom"
import { setAuthLogoutSlice } from "../../slices/authSlice"
import useStyles from "./styles"
import SearchBar from "../searchBar/SearchBar"
import { decodeToken } from "react-jwt"

const Header: React.FC<{}> = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")!))

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const classes = useStyles()

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")!))

    //get token from user token
    const token = user?.token

    console.log(user)

    //if token is expired, logout
    if (token) {
      const decodedToken: any = decodeToken(token)

      if (decodedToken.exp * 1000 < new Date().getTime()) logout()
    }
  }, [location])

  const logout = () => {
    //logout of google account
    googleLogout()

    //logout of account
    dispatch(setAuthLogoutSlice(null))

    //navigate to landing page
    navigate("/")
  }

  const navigateHome = () => {
    navigate("/")
  }

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.navbar}>
            <Button
              className={classes.button}
              onClick={navigateHome}
              variant="outlined"
              color="primary"
              size="large"
            >
              Home
            </Button>
            <Avatar className={classes.avatar}></Avatar>
            <SearchBar />

            <Button
              className={classes.button}
              onClick={logout}
              variant="contained"
              color="secondary"
              size="large"
            >
              Logout
            </Button>
          </div>
        ) : (
          <></>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
