import React from "react"
import { Container } from "@mui/material"
import CircularProgress from "@mui/material/CircularProgress"

const Loading: React.FC<{ remSize: number }> = ({ remSize }) => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        padding: "3rem 0rem",
      }}
    >
      <CircularProgress size={`${remSize} rem`} />
    </Container>
  )
}

export default Loading
