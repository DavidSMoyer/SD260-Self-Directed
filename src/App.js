import './App.css';
import {Route, Switch} from 'react-router-dom';

function App() {
  return (
    <>
      <div className="layout-grid">
        <Switch>
          <Route exact path="/"></Route>
          <Route exact path="/signup"></Route>
          <Route exact path="/login"></Route>
          <Route exact path="/create"></Route>
          <Route path="/post/:post-id"></Route>
          <Route path="/account/:account-id"></Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
