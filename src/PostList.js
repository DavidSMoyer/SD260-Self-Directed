import Post from './Post.js';
import {useEffect, useState} from 'react';

function PostList({type, user, account}) {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    (async () => {
      const posts = await fetch("http://localhost:5000/posts").then(response => response.json());
      if (type === "main") {
        setPostList(posts.filter(post => post.owner.id !== user.id));
      } else if (type === "follow") {
        setPostList(posts.filter(post => user.following.includes(post.owner.id)));
      } else if (type === "owned") {
        setPostList(posts.filter(post => post.owner.id === account.id));
      }
    })();
  }, [account, type])

  return (
    <div className="post-list">
      {postList.map((post, idx) => (
        <Post key={idx} post={post} />
      ))}
    </div>
  )
}

export default PostList;