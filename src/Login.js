import {TextField, InputAdornment} from '@material-ui/core';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {Link, useHistory} from 'react-router-dom';
import {useState} from 'react';
import {compare, compareSync} from 'bcryptjs';
import {Alert, AlertTitle} from '@material-ui/lab';

function Login({login}) {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passVisible, setPassVisible] = useState(false);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    const searchByName = await fetch(`http://localhost:5000/users?username=${name}`).then(response => response.json()).then(json => json[0]);
    const searchByEmail = await fetch(`http://localhost:5000/users?email=${name}`).then(response => response.json()).then(json => json[0]);
    const user = searchByName ? searchByName : searchByEmail;
    if (user !== undefined && compareSync(password, user.password)) {
      login(user);
      const expire = Date.now() + (24 * 60 * 60 * 1000 * 7);
      localStorage.setItem("auto-login", JSON.stringify({expire, user: {username: user.username, password: user.password}}));
      history.push("/");
      return;
    }
    setError("That username and password combination does not exist.");
  }

  const update = (e, func, max) => {
    if (e.target.value.length > max) {
      func(e.target.value.substr(0, max));
    } else {
      func(e.target.value);
    }
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
      <TextField required label="Username" onChange={e => update(e, setName, 20)} value={name} />
      <TextField 
        required
        label="Password"
        InputProps={{endAdornment: (
          <InputAdornment position="end" onClick={() => setPassVisible(!passVisible)} className="pass-toggle">{passVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}</InputAdornment>
        )}}
        type={passVisible ? "text" : "password"}
        onChange={e => update(e, setPassword, 50)}
        value={password}
      />
      <input type="submit" value="Submit" />
      <p>Don't have an account? <Link to="/signup">Sign up.</Link></p>
    </form>
  )
}

export default Login;