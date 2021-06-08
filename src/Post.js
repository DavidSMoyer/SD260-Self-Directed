import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { Link } from 'react-router-dom';
import SmallAcc from './SmallAcc';

function Post({post}) {
  return (
    <Link to={`/post/${post.id}`} className="post-link">
      <div className="post">
        <h3>{post.title}</h3>
        {post.imageURL !== undefined && <img src={post.imageURL}/>}
        <div className="stats">
          <span>
            <FavoriteBorderIcon />
            {post.likes}
          </span>
          <span>
            <ChatBubbleOutlineIcon />
            {post.comments.length}
          </span>
          <SmallAcc owner={post.owner} />
        </div>
        <p>{post.content}</p>
      </div>
    </Link>
  )
}

export default Post;