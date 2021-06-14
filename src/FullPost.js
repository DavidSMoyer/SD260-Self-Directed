import {Avatar, TextField} from '@material-ui/core';
import {Link, useParams, Redirect, useHistory} from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Comment from './Comment.js';
import {useState, useEffect} from 'react';
import { AccountBalance, SettingsInputSvideoRounded } from '@material-ui/icons';
import LoadingIcon from './LoadingIcon.js';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function FullPost({user, setUser, alert}) {
  const [post, setPost] = useState(undefined);
  const [likes, setLikes] = useState(0);
  const [owner, setOwner] = useState(undefined);
  const [loaded, setLoaded] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const { postId } = useParams();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const postReq = await fetch(`http://localhost:5000/posts/${postId}`).then(response => response.json());
      setPost(postReq);
      const ownerReq = await fetch(`http://localhost:5000/users/${postReq.owner}`).then(response => response.json());
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
    fetch(`http://localhost:5000/post/${post.id}`,
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
    const id = post.comments.reduce((acc, comment) => comment.id >= acc ? comment.id + 1 : acc, 0);
    alert(owner, "New Comment", [`${user.username} commented on your post, '${post.title}'.`, `${commentInput}`], `/post/${post.id}`);
    setPost({...post, comments: [...post.comments, {id, likes: 0, message: commentInput, owner: {id: user.id, name: user.username}, replies: []}]});
    setCommentInput("");
    
  }

  const toggleLiked = () => {
    if (post.owner === user.id) return;
    if (user.liked.includes(post.id)) {
      setUser({...user, liked: user.liked.filter(likedId => likedId !== post.id)});
      setLikes(likes - 1);
    } else {
      setUser({...user, liked: [...user.liked, post.id]});
      setLikes(likes + 1);
      alert(owner, "Post Liked", `${user.username} liked your post, '${post.title}'.`, `/posts/${post.id}`);
    }
  }

  const deletePost = () => {
    fetch(`http://localhost:5000/posts/${post.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    history.push(`/user/${user.id}`);
  }

  return (
    <>
      {  
        loaded
        ?
        <div className="post-page">
          {((!owner.following.includes(user.id) && post.private && owner !== user.id)) && <Redirect to="/" />}
          <div className="post-content">
            {
              owner.id === user.id && 
              <button className="delete-post" onClick={deletePost}>
                <DeleteForeverIcon />
              </button>
            }
            <h2>{post.title}</h2>
            <Link className="owner" to={`/user/${post.owner}`}>
              <Avatar className="owner-avatar" src={owner.imageURL}>{(owner.imageURL === "" || owner.imageURL === undefined) && owner.username[0].toUpperCase()}</Avatar>
              <span>{owner.username}</span>
            </Link>
            {post.imageURl !== "" && <img src={post.imageURL} />}
            <p>{post.content}</p>
            <form className="actions" onSubmit={submitComment}>
              <span>
                {user.liked.includes(post.id) || post.owner === user.id ? <FavoriteIcon onClick={toggleLiked} className="like-icon" /> : <FavoriteBorderIcon onClick={toggleLiked} className="like-icon" />}
                {likes}
              </span>
              <span>
                <ChatBubbleOutlineIcon />
                {post.comments.length}
              </span>
              {
                post.owner !== user.id && 
                <>
                  <TextField placeholder="Comment" required className="comment-input" onChange={updateComment} value={commentInput} id="comment" />
                  <input type="submit" value="Submit" />
                </>
              }
              
            </form>
          </div>
          <div className="comments">
            {post.comments.map(comment => (
              <Comment message={comment.message} owner={comment.owner} type="comment" replies={comment.replies} likes={comment.likes} post={post} setPost={setPost} id={comment.id} />
            ))}
          </div>
        </div>
        :
        <LoadingIcon />
      }
    </>
  )
}

export default FullPost;