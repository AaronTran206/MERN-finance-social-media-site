import React from "react"
import { TextField, Grid, InputAdornment, IconButton } from "@mui/material"
import { Visibility } from "@mui/icons-material"
import { VisibilityOff } from "@mui/icons-material"

const Input: React.FC<{
  name?: string
  label?: string
  handleChange?: any
  half?: boolean
  autoFocus?: boolean
  type?: string
  handleShowPassword?: any
}> = ({
  name,
  label,
  handleChange,
  half,
  autoFocus,
  type,
  handleShowPassword,
}) => {
  return (
    <Grid item xs={6} sm={half ? 6 : 12}>
      <TextField
        name={name}
        label={label}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        autoFocus={autoFocus}
        type={type}
        InputProps={
          name === "password" && handleShowPassword !== undefined
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : undefined
        }
      />
    </Grid>
  )
}

export default Input
