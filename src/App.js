import './App.css';
import {Route, Switch, useHistory, Redirect} from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Navbar from './Navbar.js';
import {TextField, IconButton} from '@material-ui/core';
import {useState, useEffect} from 'react';
import PostList from './PostList.js';
import FullPost from './FullPost.js';
import NotRoute from './NotRoute.js';
import Signup from './Signup.js';
import Login from './Login.js';
import CreatePost from './CreatePost.js';

function App() {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
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

      (async () => {
        const postReq = await fetch("http://localhost:5000/posts").then(response => response.json());
        setPosts(postReq);
      })();
    }
    setLoaded(true);
  }, []);

  const logout = (e) => {
    setUser(null);
    localStorage.removeItem('auto-login');
    history.push("/login");
  }

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
                  <PostList posts={posts} type="main" user={user} />
                </Route>
                <Route exact path="/follow-timeline">
                  {user === null && <Redirect to="/login" />}
                  <PostList posts={posts} type="follow" user={user} />
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
                  <CreatePost user={user} />
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
