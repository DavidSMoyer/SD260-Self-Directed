import PostList from './PostList.js';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

function Search({user, setUser}) {
  const [search, setSearch] = useState("");
  const {query} = useParams();

  useEffect(() => {
    setSearch(query);
  }, [query]);

  return (
    <div className="search-page">
      <div className="search-type">
        <span>Posts</span>
        <span>Users</span>
      </div>
    </div>
  )
}

export default Search;