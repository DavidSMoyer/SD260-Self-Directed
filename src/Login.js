import {TextField, InputAdornment} from '@material-ui/core';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {Link, useHistory} from 'react-router-dom';
import {useState} from 'react';
import {compare} from 'bcryptjs';
import {Alert, AlertTitle} from '@material-ui/lab';

function Login({login}) {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    const searchByName = await fetch(`http://localhost:5000/users?username=${name}`).then(response => response.json()).then(json => json[0]);
    const searchByEmail = await fetch(`http://localhost:5000/users?email=${name}`).then(response => response.json()).then(json => json[0]);
    console.log(searchByName);
    console.log(searchByEmail);
    if ((searchByName && compare(password, searchByName.password)) || (searchByEmail && compare(password, searchByEmail.password))) {
      const user = searchByName ? searchByName : searchByEmail;
      login(user);
      const expire = Date.now() + (24 * 60 * 60 * 1000 * 7);
      localStorage.setItem("auto-login", JSON.stringify({expire, user}));
      history.push("/");
      return;
    }
    setError("That username and password combination does not exist.");
  }

  return (
    <form className="account-form" onSubmit={submit}>
      <h1>Login</h1>
      {
        error &&
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      }
      <TextField required label="Username" onChange={e => setName(e.target.value)} />
      <TextField 
        required
        label="Password"
        InputProps={{endAdornment: (
          <InputAdornment position="end"><VisibilityOffIcon /></InputAdornment>
        )}}
        type="password"
        onChange={e => setPassword(e.target.value)}
      />
      <input type="submit" value="Submit" />
      <p>Don't have an account? <Link to="/signup">Sign up.</Link></p>
    </form>
  )
}

export default Login;