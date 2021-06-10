import SmallAcc from './SmallAcc.js';
import {TextField} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

function Comment({type, message, owner, replies, likes}) {
  return (
    <>
      <span className={type === "comment" ? "comment" : "reply"}>
        <SmallAcc owner={owner} />
        <span className="like">
          <FavoriteBorderIcon />
          <span>0</span>
        </span>
        <span className="message">{message}</span>
      </span>
      {
        (type === "comment") && 
        <ul>
          {replies.map(reply => (
            <Comment type="reply" owner={reply.owner} message={reply.message} />
          ))}
          <form className="reply-field">
            <TextField placeholder="Reply" size="small" />
          </form>
        </ul>
      }
    </>
  )
}

export default Comment;