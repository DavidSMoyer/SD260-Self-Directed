import {TextField, InputAdornment} from '@material-ui/core';
import {Alert, AlertTitle} from '@material-ui/lab';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {Link, useHistory} from 'react-router-dom';
import {useState} from 'react';
import {hashSync} from 'bcryptjs';

function Signup({login}) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const signIn = async (e) => {
    e.preventDefault();
    const errorList = [];
    if (password.length < 6) errorList.push("Password length must be six or more characters.");
    if (password !== confirm) errorList.push("Passwords do not match.");
    if (errorList.length > 0) {
      setErrors(errorList);
      return;
    }
    const duplicateEmail = await fetch(`http://localhost:5000/users?email=${email}`).then(response => response.json());
    if (duplicateEmail.length > 0) {
      setErrors(["That account is already in use."]);
      return;
    }

    const passHash = hashSync(password, 10);
    const user = {
      fname,
      lname,
      username,
      email,
      following: [],
      liked: [],
      password: passHash
    }
    const uploadUser = await fetch('http://localhost:5000/users', {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify(user)
    });
    if (uploadUser.ok) {
      const userResponse = await uploadUser.json();
      login(userResponse);
      const expire = Date.now() + (24 * 60 * 60 * 1000 * 7);
      localStorage.setItem("auto-login", JSON.stringify({expire, user: userResponse}));
      history.push("/");
    } else {
      setErrors(["Something went wrong."]);
    }
  }

  return (
    <form class="account-form" onSubmit={signIn}>
      <h1>Sign Up</h1>
      {
        errors.length > 0 &&
        <Alert severity="error" className="form-alert">
          <AlertTitle>Error</AlertTitle>
          <ul>
            {
              errors.map(error => <li>{error}</li>)
            }
          </ul>
        </Alert>
      }
      <span>
        <TextField required label="First Name" onChange={(e) => setFname(e.target.value)} />
        <TextField required label="Last Name" onChange={(e) => setLname(e.target.value)}/>
      </span>
      <TextField required label="Username" onChange={(e) => setUsername(e.target.value)}/>
      <TextField required label="Email" onChange={(e) => setEmail(e.target.value)}/>
      <TextField 
        required
        label="Password"
        InputProps={{endAdornment: (
          <InputAdornment position="end"><VisibilityOffIcon /></InputAdornment>
        )}}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <TextField 
        required
        label="Confirm Password"
        InputProps={{endAdornment: (
          <InputAdornment position="end"><VisibilityOffIcon /></InputAdornment>
        )}}
        onChange={(e) => setConfirm(e.target.value)}
        type="password"
      />
      <input type="submit" value="Submit" />
      <p>Already have an account? <Link to="/login">Login.</Link></p>
    </form>
  )
}

export default Signup;