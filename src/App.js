import './App.css';
import {Route, Switch} from 'react-router-dom';
import Navbar from './Navbar.js';

function App() {
  return (
    <>
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
        </Switch>}
      </div>
    </>
  );
}

export default App;
