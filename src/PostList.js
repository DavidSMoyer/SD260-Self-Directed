import Post from './Post.js';

function PostList({type, posts}) {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  )
}

export default PostList;