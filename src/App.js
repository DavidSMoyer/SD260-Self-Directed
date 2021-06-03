import './App.css';
import {Route, Switch, useHistory} from 'react-router-dom';
import Navbar from './Navbar.js';
import {TextField} from '@material-ui/core';
import {useState} from 'react';
import Post from './Post.js';

function App() {
  const [query, setQuery] = useState("");
  const history = useHistory();

  const search = (e) => {
    e.preventDefault();
    history.push(`/search/${query}`);
  }

  const postTest = {
    title: "Post Title",
    imageURL: "https://tse3.mm.bing.net/th?id=OIP.mDzIoaqnw_whAiaTSz4iwgHaFj&pid=Api&P=0&w=214&h=161",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea earum at explicabo, voluptatem itaque iste sunt eum nesciunt, atque quam quod qui aliquid consequatur optio ut velit architecto voluptate sed.",
    likes: 200,
    comments: [{}, {}, {}, {}, {}, {}]
  }

  return (
    <>
      <form className="search" onSubmit={search}>
        <TextField value={query} onChange={(e) => setQuery(e.target.value)} variant="outlined" className="search-field" />
      </form>
      <div className="layout-grid">
        <Navbar />
        {<Switch>
          <Route exact path="/">
            <div>
              <Post post={postTest}/>
            </div>
          </Route>
          <Route exact path="/follow-timeline"></Route>
          <Route exact path="/signup"></Route>
          <Route exact path="/login"></Route>
          <Route exact path="/create"></Route>
          <Route path="/post/:post-id"></Route>
          <Route path="/account/:account-id"></Route>
          <Route path="/search/:query"></Route>
        </Switch>}
      </div>
    </>
  );
}

export default App;
