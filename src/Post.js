import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

function Post({post}) {

  // Post:
  // Title
  // ImageURL
  // Content
  // Likes
  // Comments


  return (
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
        <span>
          User Account
        </span>
      </div>
      <p>{post.content}</p>
    </div>
  )
}

export default Post;