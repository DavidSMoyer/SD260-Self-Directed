import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { Link } from 'react-router-dom';
import SmallAcc from './SmallAcc';
import {useState, useEffect} from 'react';

function Post({post, user, setUser}) {
  const [postInfo, setPostInfo] = useState(null);
  const [likes, setLikes] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const toggleLike = (e) => {
    if (post.owner.id === user.id) return;
    e.preventDefault();
    if (user.liked.includes(post.id)) {
      setUser({...user, liked: user.liked.filter(postId => postId !== post.id)});
      setLikes(likes - 1);
    } else {
      setUser({...user, liked: [...user.liked, post.id]});
      setLikes(likes + 1);
    }
  }

  useEffect(() => {
    (async () => {
      setPostInfo(post);
      const users = await fetch(`http://localhost:5000/users`).then(response => response.json());
      setLikes(users.filter(user => user.liked.includes(post.id)).length);
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({liked: user.liked})
    });
    const expire = JSON.parse(localStorage.getItem("auto-login")).expire;
    localStorage.setItem("auto-login", JSON.stringify({expire, user}));
  }, [user]);

  return (
    <>
      {
        loaded &&
        <Link to={`/post/${postInfo.id}`} className="post-link">
          <div className="post">
            <h3>{postInfo.title}</h3>
            {postInfo.imageURL !== "" ? <img src={postInfo.imageURL}/> : <p>{postInfo.content}</p>}
            <div className="stats">
              <span>
                {user.liked.includes(postInfo.id) || postInfo.owner.id === user.id ? <FavoriteIcon onClick={toggleLike} /> : <FavoriteBorderIcon onClick={toggleLike} />}
                {likes}
              </span>
              <span>
                <ChatBubbleOutlineIcon />
                {postInfo.comments.length}
              </span>
              <SmallAcc owner={postInfo.owner} />
            </div>
            {postInfo.imageURL !== "" && <p>{postInfo.content}</p>}
          </div>
        </Link>
      }
    </>
  )
}

export default Post;