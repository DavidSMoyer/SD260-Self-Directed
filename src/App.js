import './App.css';
import {Route, Switch, useHistory, Redirect} from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Navbar from './Navbar.js';
import {TextField, IconButton} from '@material-ui/core';
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
  const [loaded, setLoaded] = useState(false);
  const history = useHistory();

  const search = (e) => {
    e.preventDefault();
    history.push(`/search/${query}`);
  }

  useEffect(() => {
    const oldUser = JSON.parse(localStorage.getItem("auto-login"));
    if (oldUser !== null) {
      if (oldUser.expire > Date.now()) {
        oldUser.expire = Date.now() + (24 * 60 * 60 * 1000 * 7);
        setUser(oldUser.user);
        localStorage.setItem("auto-login", JSON.stringify(oldUser));
      } else {
        localStorage.removeItem("auto-login");
      }
    }
    setLoaded(true);
  }, []);

  const logout = (e) => {
    setUser(null);
    localStorage.removeItem('auto-login');
    history.push("/login");
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
      {
        loaded &&
        <>
          <NotRoute path={["/login","/signup"]}>
            <form className="search" onSubmit={search}>
              <TextField value={query} onChange={(e) => setQuery(e.target.value)} variant="outlined" className="search-field" />
            </form>
          </NotRoute>
          {
            user !== null &&
            <IconButton color="primary" className="logout" onClick={logout}>
              <ExitToAppIcon />
            </IconButton>
          }
          <div className="layout-grid">
            <NotRoute path={["/login","/signup"]} replace="true">
              <Navbar />
            </NotRoute>
            <div className="scroll-container">
              {<Switch>
                <Route exact path="/">
                  {user === null && <Redirect to="/login" />}
                  <PostList posts={postList} type="main" />
                </Route>
                <Route exact path="/follow-timeline">
                  {user === null && <Redirect to="/login" />}
                  <PostList posts={postList} type="follow" />
                </Route>
                <Route exact path="/signup">
                  {user !== null && <Redirect to="/" />}
                  <Signup login={setUser} />
                </Route>
                <Route exact path="/login">
                  {user !== null && <Redirect to="/" />}
                  <Login login={setUser} />
                </Route>
                <Route exact path="/create">
                  {user === null && <Redirect to="/login" />}
                </Route>
                <Route path="/post/:postId">
                  {user === null && <Redirect to="/login" />}
                  <FullPost />
                </Route>
                <Route path="/account/:accountId">
                  {user === null && <Redirect to="/login" />}
                </Route>
                <Route path="/search/:query">
                  {user === null && <Redirect to="/login" />}
                </Route>
              </Switch>}
            </div>
          </div>
        </>
      }
    </>
  );
}

export default App;
