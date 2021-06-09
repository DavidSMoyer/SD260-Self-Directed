import {Avatar, TextField} from '@material-ui/core';
import {Link, useParams, Redirect} from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Comment from './Comment.js';
import {useState, useEffect} from 'react';

function FullPost({user}) {
  const [post, setPost] = useState(undefined);
  const [owner, setOwner] = useState(undefined);
  const [commentInput, setCommentInput] = useState("");
  const { postId } = useParams();

  useEffect(() => {
    (async () => {
      const postReq = await fetch(`http://localhost:5000/posts/${postId}`).then(response => response.json());
      setPost(postReq);
      const ownerReq = await fetch(`http://localhost:5000/users/${postReq.owner.id}`).then(response => response.json());
      setOwner(ownerReq);
    })()
  }, [])

  const updateComment = (e) => {
    if (e.target.value.length > 100) {
      setCommentInput(e.target.value.substr(0, 100));
    } else {
      setCommentInput(e.target.value);
    }
  }

  const submitComment = (e) => {
    e.preventDefault();
  }

  return (
    <>
      {  
        (post !== undefined && owner !== undefined )&&
        <div className="post-page">
          {(!owner.following.includes(user.id) && post.private) && <Redirect to="/" />}
          <div className="post-content">
            <h2>{post.title}</h2>
            <Link className="owner" to={`/user/${post.owner.id}`}>
              <Avatar className="owner-avatar" src={owner.imageURL}>{owner.imageURL === "" && owner.username[0].toUpperCase()}</Avatar>
              <span>{owner.username}</span>
            </Link>
            {post.imageURl !== "" && <img src={post.imageURL} />}
            <p>{post.content}</p>
            <form className="actions">
              <span>
                <FavoriteBorderIcon />
                {post.likes}
              </span>
              <span>
                <ChatBubbleOutlineIcon />
                {post.comments.length}
              </span>
              <TextField placeholder="Comment" required className="comment-input" onChange={updateComment} value={commentInput} />
              <input type="submit" value="Submit" />
            </form>
          </div>
          <div className="comments">
            {post.comments.map(comment => (
              <Comment message={comment.message} owner={comment.owner} type="comment" replies={comment.replies} likes={comment.likes} />
            ))}
          </div>
        </div>
      }
    </>
  )
}

export default FullPost;