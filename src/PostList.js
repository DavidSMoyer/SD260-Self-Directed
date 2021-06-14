import Post from './Post.js';
import {useEffect, useState} from 'react';

function PostList({type, user, account, setUser, query, alert}) {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    (async () => {
      if (type !== "owned") {
        let posts = await fetch("http://localhost:5000/posts").then(response => response.json());
        posts.sort((post1, post2) => post2.postTime - post1.postTime);
        if (type === "follow") {
          posts = posts.filter(post => user.following.includes(post.owner.id));
        } else if (type === "search") {
          posts = posts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()) || post.content.toLowerCase().includes(query.toLowerCase()));
        }
        posts = posts.filter(post => post.owner.id !== user.id);
        const ownerList = posts.map(post => fetch(`http://localhost:5000/users/${post.owner.id}`));
        await Promise.all(ownerList).then(responses => {
          Promise.all(responses.map(response => response.json())).then(owners => {
            posts = posts.filter((post, idx) => !post.private || (post.owner.id === user.id || owners[idx].following.includes(user.id)));
            setPostList(posts);
          })
        });
      } else {
        let posts = await fetch(`http://localhost:5000/posts?owner.id=${account.id}`).then(response => response.json());
        setPostList(posts.filter(post => !post.private || (account.following.includes(user.id) || user.id === account.id)));
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