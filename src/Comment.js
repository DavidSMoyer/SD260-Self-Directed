import SmallAcc from './SmallAcc.js';

function Comment({type, message, owner, replies, likes}) {
  return (
    <>
      <span className={type === "comment" ? "comment" : "reply"}>
        <SmallAcc owner={owner} />
        <span className="message">{message}</span>
        <span className="options"></span>
      </span>
      {
        (replies !== undefined && replies.length > 0 && type === "comment") && 
        <ul>
          {replies.map(reply => (
            <Comment type="reply" owner={reply.owner} message={reply.message} />
          ))}
        </ul>
      }
    </>
  )
}

export default Comment;