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
    <div>
      <p>
        <span><img src={user.avatar} alt="avatar" /></span>
        <span>{user.username}</span>
      </p>
      <p>{props.comment.value}</p>
    </div>
  )
}

export default Comment;