import {Avatar} from '@material-ui/core';
import {Link, useParams} from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Comment from './Comment.js';
import {useState, useEffect} from 'react';

function FullPost() {
  const [post, setPost] = useState(undefined);
  const [owner, setOwner] = useState(undefined);
  const { postId } = useParams();

  useEffect(() => {
    (async () => {
      const postReq = await fetch(`http://localhost:5000/posts/${postId}`).then(response => response.json());
      setPost(postReq);
      const ownerReq = await fetch(`http://localhost:5000/users/${postReq.owner.id}`).then(response => response.json());
      setOwner(ownerReq);
    })()
  }, [])

  return (
    <>
      {  
        (post !== undefined && owner !== undefined )&&
        <div className="post-page">
          <div className="post-content">
            <h2>{post.title}</h2>
            <Link className="owner" to={`/user/${post.owner.id}`}>
              <Avatar className="owner-avatar" src={owner.imageURL}>{owner.imageURL === "" && owner.username[0].toUpperCase()}</Avatar>
              <span>{owner.username}</span>
            </Link>
            {post.imageURl !== "" && <img src={post.imageURL} />}
            <p>{post.content}</p>
            <div className="stats">
              <span>
                <FavoriteBorderIcon />
                {post.likes}
              </span>
              <span>
                <ChatBubbleOutlineIcon />
                {post.comments.length}
              </span>
            </div>
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