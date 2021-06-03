import './App.css';
import {Route, Switch, useHistory} from 'react-router-dom';
import Navbar from './Navbar.js';
import {TextField} from '@material-ui/core';
import {useState} from 'react';

function App() {
  const [query, setQuery] = useState("");
  const history = useHistory();

  const search = (e) => {
    e.preventDefault();
    history.push(`/search/${query}`);
  }

  return (
    <>
      <form className="search" onSubmit={search}>
        <TextField value={query} onChange={(e) => setQuery(e.target.value)} variant="outlined" className="search-field" />
      </form>
      <div className="layout-grid">
        <Navbar />
        {<Switch>
          <Route exact path="/"></Route>
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
