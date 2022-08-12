import React from "react"
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt"
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt"

const Likes: React.FC<{
  likes: string[]
  small?: boolean
  noText?: boolean
}> = ({ likes, small, noText }) => {
  //get current profile ID to compare with individual posts
  const user = JSON.parse(localStorage.getItem("profile")!)
  const userId = user?.result.sub || user?.result._id

  if (noText) {
    //if the there is a person that liked the post
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize={small ? "small" : "medium"} />
          &nbsp; {likes.length}
        </>
      ) : (
        <>
          <ThumbUpOffAltIcon fontSize={small ? "small" : "medium"} />
          &nbsp;{likes.length}
        </>
      )
    }
    //if nobody has liked the post yet
    return (
      <>
        <ThumbUpOffAltIcon fontSize={small ? "small" : "medium"} />
        &nbsp;
      </>
    )
  }

  //if the there is a person that liked the post
  if (likes.length > 0) {
    return likes.find((like) => like === userId) ? (
      <>
        <ThumbUpAltIcon fontSize={small ? "small" : "medium"} />
        &nbsp;
        {likes.length > 2
          ? `You and ${likes.length - 1} others`
          : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
      </>
    ) : (
      <>
        <ThumbUpOffAltIcon fontSize={small ? "small" : "medium"} />
        &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
      </>
    )
  }
  //if nobody has liked the post yet
  return (
    <>
      <ThumbUpOffAltIcon fontSize={small ? "small" : "medium"} />
      &nbsp; Like
    </>
  )
}

export default Likes
