import Post from './Post.js';
import {useEffect, useState} from 'react';

function PostList({type, posts, user}) {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    if (type === "main") {
      setPostList(posts.filter(post => post.owner.id !== user.id));
    } else if (type === "follow") {
      setPostList(posts.filter(post => user.following.includes(post.owner.id)));
    }
  }, [])

  return (
    <div className="post-list">
      {postList.map((post, idx) => (
        <Post key={idx} post={post} />
      ))}
    </div>
  )
}

export default PostList;