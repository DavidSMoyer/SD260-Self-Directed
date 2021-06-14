import Post from './Post.js';
import {useEffect, useState} from 'react';

function PostList({type, user, account, setUser, query, alert}) {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    (async () => {
      let posts = await fetch("http://localhost:5000/posts").then(response => response.json());
      posts.sort((post1, post2) => post2.postTime - post1.postTime);
      if (type === "main") {
        posts = posts.filter(post => post.owner.id !== user.id);
      } else if (type === "follow") {
        posts = posts.filter(post => user.following.includes(post.owner.id));
      } else if (type === "owned") {
        posts = posts.filter(post => post.owner.id === account.id);
      } else if (type === "search") {
        console.log(posts);
        posts = posts.filter(post => post.owner.id !== user.id);
        console.log(posts);
        posts = posts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()) || post.content.toLowerCase().includes(query.toLowerCase()));
        console.log(posts);
      }

      if (type !== "owned" || account.id !== user.id) {
        const postCheck = posts.map(post => fetch(`http://localhost:5000/users/${post.owner.id}`));
        const owners = await Promise.all(postCheck).
          then(responses => Promise.all(responses.map(response => response.json())));
        setPostList(posts.filter((post, idx) => !post.private || owners[idx].following.includes(user.id)));
      } else {
        setPostList(posts);
      }
    })();
  }, [account, type, query])

  return (
    <div className="post-list">
      {postList.map((post, idx) => {
        console.log(post);
        return <Post key={idx} post={post} user={user} setUser={setUser} alert={alert} />
      })}
    </div>
  )
}

export default PostList;