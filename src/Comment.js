import SmallAcc from './SmallAcc.js';
import {TextField} from '@material-ui/core';
import {useState} from 'react';

function Comment({type, message, owner, replies, post, setPost, id, user, alert}) {
  const [reply, setReply] = useState("");

  const updateReply = (e) => {
    if (e.target.value.length > 100) {
      setReply(e.target.value.substr(0, 100));
    } else {
      setReply(e.target.value);
    }
  }

  const postReply = (e) => {
    e.preventDefault();
    const postClone = {...post};
    postClone.comments = postClone.comments.map(loopComment => {
      if (loopComment.id === id) {
        const newId = loopComment.replies.reduce((acc, comment) => comment.id >= acc ? comment.id + 1 : acc, 0);
        loopComment.replies = [...loopComment.replies, {message: reply, id: newId, owner: user.id}];
      }
      return loopComment;
    });
    setPost(postClone);
    setReply("");

    let alertUsers = [owner, ...replies.reduce((acc, reply) => acc.includes(reply.owner) ? acc : [...acc, reply.owner], [])];
    alertUsers = alertUsers.filter(alertUser => alertUser !== user.id);
    alertUsers.forEach(id => {
      alert(id, "New Reply", "Someone replied to a conversation you're a part of.", `/post/${post.id}`);
    })
  }


  return (
    <>
      <span className={type === "comment" ? "comment" : "reply"}>
        <SmallAcc owner={owner} />
        <span className="message">{message}</span>
      </span>
      {
        (type === "comment") && 
        <ul className="reply-list">
          {replies.map((reply, idx) => (
            <Comment key={idx} type="reply" owner={reply.owner} message={reply.message} />
          ))}
          <form className="reply-field" onSubmit={postReply}>
            <TextField placeholder="Reply" size="small" value={reply} onChange={updateReply} />
          </form>
        </ul>
      }
    </>
  )
}

export default Comment;