import Post from './Post.js';

function PostList({type, posts}) {
  return (
    <div className="post-list">
      {posts.map((post, idx) => (
        <Post key={idx} post={post} />
      ))}
    </div>
  )
}

export default PostList;