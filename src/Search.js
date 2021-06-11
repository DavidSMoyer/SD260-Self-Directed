import PostList from './PostList.js';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import UserList from './UserList.js';

function Search({user, setUser}) {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("posts")
  const {query} = useParams();

  useEffect(() => {
    setSearch(query);
  }, [query]);

  return (
    <div className="search-page">
      <div className="search-type">
        <span class={searchType === "posts" ? "selected" : ""} onClick={() => setSearchType("posts")}>Posts</span>
        <span class={searchType === "users" ? "selected" : ""} onClick={() => setSearchType("users")}>Users</span>
      </div>
      {
        searchType === "posts"
        ?
          <PostList type="search" query={search} user={user} setUser={setUser} />
        :
          <UserList query={search} user={user} />
      }
    </div>
  )
}

export default Search;