import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { Link, useHistory } from 'react-router-dom';
import SmallAcc from './SmallAcc';
import {useState, useEffect} from 'react';
import LoadingIcon from './LoadingIcon.js';

function Post({post, user, setUser, alert}) {
  const [postInfo, setPostInfo] = useState(null);
  const [likes, setLikes] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const history = useHistory();

  const toggleLike = (e) => {
    if (post.owner === user.id) return;
    e.preventDefault();
    if (user.liked.includes(post.id)) {
      setUser({...user, liked: user.liked.filter(postId => postId !== post.id)});
      setLikes(likes - 1);
    } else {
      setUser({...user, liked: [...user.liked, post.id]});
      setLikes(likes + 1);
      alert(postInfo.owner, "Post Liked", `${user.username} liked your post, '${postInfo.title}'.`, `/post/${postInfo.id}`);
    }
  }

  useEffect(() => {
    (async () => {
      setPostInfo(post);
      const users = await fetch(`http://localhost:5000/users`).then(response => response.json());
      setLikes(users.filter(user => user.liked.includes(post.id)).length);
      setLoaded(true);
    })();
  }, [post]);

  return (
    <>
      {
        loaded
        ?
        <Link to={`/post/${postInfo.id}`} className="post-link">
          <div className="post">
            <h3>{postInfo.title}</h3>
            {postInfo.imageURL !== "" ? <img src={postInfo.imageURL}/> : <p>{postInfo.content}</p>}
            <div className="stats">
              <span>
                {user.liked.includes(postInfo.id) || postInfo.owner === user.id ? <FavoriteIcon onClick={toggleLike} className="like-icon" /> : <FavoriteBorderIcon onClick={toggleLike} className="like-icon" />}
                {likes}
              </span>
              <span>
                <ChatBubbleOutlineIcon onClick={(e) => {e.preventDefault(); history.push(`/post/${postInfo.id}#comment`)}} />
                {postInfo.comments.length}
              </span>
              <SmallAcc owner={postInfo.owner} />
            </div>
            {postInfo.imageURL !== "" && <p>{postInfo.content}</p>}
          </div>
        </Link>
        :
        <LoadingIcon />
      }
    </>
  )
}

export default Post;