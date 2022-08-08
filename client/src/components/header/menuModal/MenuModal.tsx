import React from "react"
import {
  Button,
  Modal,
  Paper,
  Box,
  Avatar,
  Grid,
  Typography,
  Divider,
  createTheme,
} from "@mui/material"
import { stringToColor } from "../../utils/stringToColorFunc"
import useStyles from "./styles"
import { Translate } from "@mui/icons-material"
import { transform } from "typescript"

interface menuOptionsInterface {
  title: string
  route: any
}

const MenuModal: React.FC<{
  handleOpen: boolean
  handleClose: any
  givenName: string
  familyName: string
  navigateLanding: Function
  logout: any
}> = ({
  handleOpen,
  handleClose,
  givenName,
  familyName,
  navigateLanding,
  logout,
}) => {
  const theme = createTheme()
  const classes = useStyles()
  const menuOptions: menuOptionsInterface[] = [
    {
      title: "Home",
      route: navigateLanding,
    },
  ]

  return (
    <Modal open={handleOpen} onClose={handleClose}>
      <Box className={classes.box} sx={{ position: "relative" }}>
        <Paper className={classes.paper}>
          <Grid container direction="column">
            <Grid
              item
              display="flex"
              justifyContent="center"
              alignContent="center"
            >
              <Avatar
                className={classes.avatar}
                sx={{
                  bgcolor: stringToColor(`${givenName} ${familyName}`),
                  height: 100,
                  width: 100,
                }}
                children={`${givenName?.split("")[0]} ${
                  familyName?.split("")[0]
                }`}
              />
            </Grid>
            <Grid
              item
              sx={{
                marginBottom: theme.spacing(4),
              }}
            >
              <Typography
                className={classes.avatarText}
                variant="h4"
                sx={{ marginBottom: theme.spacing(2) }}
              >{`${givenName} ${familyName}`}</Typography>
              <Divider />
            </Grid>

            {menuOptions.map((item, i) => (
              <Grid
                item
                display="flex"
                justifyContent="center"
                alignContent="center"
              >
                <Button onClick={item.route}>
                  <Typography variant="h3">{item.title}</Typography>
                </Button>
                {i === menuOptions.length - 1 ? null : <Divider />}
              </Grid>
            ))}
            <Grid
              item
              sx={{
                position: "absolute",
                bottom: theme.spacing(10),
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <Button onClick={logout} color="error" variant="outlined">
                <Typography variant="h3">Logout</Typography>
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Modal>
  )
}

export default MenuModal
