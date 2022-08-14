import React from "react"
import {
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  FormHelperText,
  createTheme,
} from "@mui/material"
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
  passwordError?: boolean
  describedby?: string
  value: string
}> = ({
  name,
  label,
  handleChange,
  half,
  autoFocus,
  type,
  handleShowPassword,
  passwordError,
  describedby,
  value,
}) => {
  const theme = createTheme()

  return (
    <Grid item xs={6} sm={half ? 6 : 12}>
      <TextField
        value={value}
        aria-describedby={describedby}
        error={passwordError}
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
      {passwordError && name === "confirmPassword" && (
        <Grid item xs={12}>
          <FormHelperText sx={{ color: theme.palette.error.light }}>
            Passwords don't match.
          </FormHelperText>
        </Grid>
      )}
    </Grid>
  )
}

export default Input
