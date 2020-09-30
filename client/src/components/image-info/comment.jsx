import React from 'react';

const Comment = (props) => {
  // console.log(props.comment)
  return(
  <p>{props.comment.value}</p>
  )
}

export default Comment;