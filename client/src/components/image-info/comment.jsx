import React, { useEffect, useState } from 'react';
import userSecvice from '../../services/user-service'

const Comment = (props) => {
  const [user, setUser] = useState({})
  useEffect(() => {
    const userId = props.comment.author
    userSecvice.getUserInfo(userId)
      .then(user => {
        setUser(user.data)
      })
      .catch(err => {
        console.error(err);
      })
  }, [props])

  return (
    <div className="comment-box">
      <p className="user-container">
        <span className="avatar">
          <img src={user.avatar} alt="avatar" />
        </span>
        <span>{user.username}</span>
      </p>
      <p className="comment">{props.comment.value}</p>
    </div>
  )
}

export default Comment;