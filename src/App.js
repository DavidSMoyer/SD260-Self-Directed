import './App.css';
import {Route, Switch, useHistory} from 'react-router-dom';
import Navbar from './Navbar.js';
import {TextField} from '@material-ui/core';
import {useState, useEffect} from 'react';
import Post from './Post.js';
import PostList from './PostList.js';
import FullPost from './FullPost.js';
import NotRoute from './NotRoute.js';
import Signup from './Signup.js';
import Login from './Login.js';

function App() {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const history = useHistory();

  const search = (e) => {
    e.preventDefault();
    history.push(`/search/${query}`);
  }


  const postList = [
    {
      title: "Post Title",
      imageURL: "https://tse3.mm.bing.net/th?id=OIP.mDzIoaqnw_whAiaTSz4iwgHaFj&pid=Api&P=0&w=214&h=161",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea earum at explicabo, voluptatem itaque iste sunt eum nesciunt, atque quam quod qui aliquid consequatur optio ut velit architecto voluptate sed.",
      likes: 200,
      comments: [{}, {}, {}, {}, {}, {}],
      id: "12345",
      owner: {
        name: "TestUser",
        img: "",
        id: "placeholder"
      }
    },
    {
      title: "Post Title 2",
      imageURL: "https://tse3.mm.bing.net/th?id=OIP.mDzIoaqnw_whAiaTSz4iwgHaFj&pid=Api&P=0&w=214&h=161",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea earum at explicabo, voluptatem itaque iste sunt eum nesciunt, atque quam quod qui aliquid consequatur optio ut velit architecto voluptate sed.",
      likes: 200,
      comments: [{}, {}, {}, {}, {}, {}],
      id: "12345",
      owner: {
        name: "TestUser",
        img: "",
        id: "placeholder"
      }
    },
    {
      title: "Post Title 3",
      imageURL: "https://tse3.mm.bing.net/th?id=OIP.mDzIoaqnw_whAiaTSz4iwgHaFj&pid=Api&P=0&w=214&h=161",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea earum at explicabo, voluptatem itaque iste sunt eum nesciunt, atque quam quod qui aliquid consequatur optio ut velit architecto voluptate sed.",
      likes: 200,
      comments: [{}, {}, {}, {}, {}, {}],
      id: "12345",
      owner: {
        name: "TestUser",
        img: "",
        id: "placeholder"
      }
    }
  ];

  return (
    <>
      <form className="search" onSubmit={search}>
        <TextField value={query} onChange={(e) => setQuery(e.target.value)} variant="outlined" className="search-field" />
      </form>
      <div className="layout-grid">
      <NotRoute path={["/login","/signup"]} replace="true">
        <Navbar />
      </NotRoute>
        <div className="scroll-container">
          {<Switch>
            <Route exact path="/">
              <PostList posts={postList} type="main" />
            </Route>
            <Route exact path="/follow-timeline">
              <PostList posts={postList} type="follow" />
            </Route>
            <Route exact path="/signup">
              <Signup login={setUser} />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/create"></Route>
            <Route path="/post/:postId">
              <FullPost />
            </Route>
            <Route path="/account/:accountId"></Route>
            <Route path="/search/:query"></Route>
          </Switch>}
        </div>
      </div>
    </>
  );
}

export default App;
