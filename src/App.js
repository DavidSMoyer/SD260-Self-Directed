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
import User from './User.js';
import AlertPage from './AlertPage.js';
import Settings from './Settings.js';
import Search from './Search.js';

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

  useEffect(() => {
    if (user === null || loaded === false) return;
    const updateUser = {...user};
    delete updateUser.alerts;
    fetch(`http://localhost:5000/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(user)
    });
    const expire = Date.now() + (24 * 60 * 60 * 1000 * 7);
    localStorage.setItem("auto-login", JSON.stringify({user, expire}))
  }, [user])

  const logout = (e) => {
    setUser(null);
    localStorage.removeItem('auto-login');
    history.push("/login");
  }

  const alertUser = async (userID, alertTitle, alertMessage, alertRedirect) => {
    const user = await fetch(`http://localhost:5000/users/${userID}`).then(response => response.json());
    const alerts = user.alerts;
    alerts.unshift({title: alertTitle, message: alertMessage, redirect: alertRedirect, seen: false, id: alerts.reduce((acc, alert) => alert.id >= acc ? alert.id + 1 : acc, 0)});
    fetch(`http://localhost:5000/users/${userID}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({alerts})
    });
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
            {
              user !== null
              ?
              <NotRoute path={["/login","/signup"]} replace="true">
                <Navbar user={user} />
              </NotRoute>
              :
              <div></div>
            }
            <div className="scroll-container">
              {<Switch>
                <Route exact path="/">
                  {
                    user === null 
                    ? 
                    <Redirect to="/login" />
                    :
                    <PostList type="main" user={user} setUser={setUser} alert={alertUser} />
                  }
                </Route>
                <Route exact path="/follow-timeline">
                  {user === null && <Redirect to="/login" />}
                  <PostList type="follow" user={user} setUser={setUser} alert={alertUser} />
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
                  <FullPost user={user} setUser={setUser} alert={alertUser} />
                </Route>
                <Route path="/user/:accountId">
                  {user === null && <Redirect to="/login" />}
                  <User user={user} setUser={setUser} alert={alertUser} />
                </Route>
                <Route path="/search/:query">
                  {user === null && <Redirect to="/login" />}
                  <Search user={user} setUser={setUser} alert={alertUser} />
                </Route>
                <Route path="/alerts" exact>
                  <AlertPage user={user} setUser={setUser} />
                </Route>
                <Route path="/settings" exact>
                  <Settings user={user} setUser={setUser} />
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
