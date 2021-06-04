import {Avatar} from '@material-ui/core';
import {Link} from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Comment from './Comment.js';

function FullPost() {

  const post = {
    title: "Post Title",
    imageURL: "https://tse3.mm.bing.net/th?id=OIP.mDzIoaqnw_whAiaTSz4iwgHaFj&pid=Api&P=0&w=214&h=161",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea earum at explicabo, voluptatem itaque iste sunt eum nesciunt, atque quam quod qui aliquid consequatur optio ut velit architecto voluptate sed.",
    likes: 200,
    comments: [
      {
        owner: {
          name: "TestUser2",
          img: "",
          id: "placeholder"
        },
        message: "Lol bad",
        likes: 0, 
        replies: 
        [
          {
            message: "no ur bad", 
            likes: 9999,
            owner: {
              name: "TestUser2",
              img: "",
              id: "placeholder"
            }
          }
        ]
      },
      {
        owner: {
          name: "TestUser2",
          img: "",
          id: "placeholder"
        },
        message: "noice",
        likes: 23,
        replies: []
      }
    ],
    id: "12345",
    owner: {
      id: "placeholder",
      img: "",
      name: "TestUser"
    }
  }

  return (
    <div className="post-page">
      <div className="post-content">
        <h2>{post.title}</h2>
        <Link className="owner" to={`/user/${post.owner.id}`}>
          <Avatar className="owner-avatar" src={post.owner.img}>{post.owner.img === "" && post.owner.name[0].toUpperCase()}</Avatar>
          <span>{post.owner.name}</span>
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
  )
}

export default FullPost;