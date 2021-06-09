import {Avatar, TextField} from '@material-ui/core';
import {Link, useParams, Redirect} from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Comment from './Comment.js';
import {useState, useEffect} from 'react';
import { SettingsInputSvideoRounded } from '@material-ui/icons';

function FullPost({user, setUser}) {
  const [post, setPost] = useState(undefined);
  const [likes, setLikes] = useState(0);
  const [owner, setOwner] = useState(undefined);
  const [loaded, setLoaded] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const { postId } = useParams();

  useEffect(() => {
    (async () => {
      const postReq = await fetch(`http://localhost:5000/posts/${postId}`).then(response => response.json());
      setPost(postReq);
      const ownerReq = await fetch(`http://localhost:5000/users/${postReq.owner.id}`).then(response => response.json());
      setOwner(ownerReq);
      setLoaded(true);
    })()
  }, [])

  useEffect(() => {
    if (post === undefined) return;
    (async () => {
      const users = await fetch(`http://localhost:5000/users`).then(response => response.json());
      setLikes(users.filter(user => user.liked.includes(post.id)).length);
    })();
    fetch(`http://localhost:5000/posts/${post.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({comments: post.comments})
    })
  }, [post]);

  const updateComment = (e) => {
    if (e.target.value.length > 100) {
      setCommentInput(e.target.value.substr(0, 100));
    } else {
      setCommentInput(e.target.value);
    }
  }

  const submitComment = (e) => {
    e.preventDefault();
    setPost({...post, comments: [...post.comments, {message: commentInput, owner: {id: user.id, name: user.username}, replies: []}]});
  }

  const toggleLiked = () => {
    if (user.liked.includes(post.id)) {
      setUser({...user, liked: user.liked.filter(likedId => likedId !== post.id)});
      setLikes(likes - 1);
    } else {
      setUser({...user, liked: [...user.liked, post.id]});
      setLikes(likes + 1);
    }
  }

  useEffect(() => {
    fetch(`http://localhost:5000/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({liked: user.liked})
    });
    const expire = JSON.parse(localStorage.getItem("auto-login")).expire;
    localStorage.setItem("auto-login", JSON.stringify({user, expire}));
  }, [user])

  return (
    <>
      {  
        loaded &&
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
            <form className="actions" onSubmit={submitComment}>
              <span>
                {user.liked.includes(post.id) ? <FavoriteIcon onClick={toggleLiked} className="like-icon" /> : <FavoriteBorderIcon onClick={toggleLiked} className="like-icon" />}
                {likes}
              </span>
              <span>
                <ChatBubbleOutlineIcon />
                {post.comments.length}
              </span>
              <TextField placeholder="Comment" required className="comment-input" onChange={updateComment} value={commentInput} id="comment" />
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