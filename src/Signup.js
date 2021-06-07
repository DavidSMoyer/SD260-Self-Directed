import {TextField, InputAdornment} from '@material-ui/core';
import {Alert, AlertTitle} from '@material-ui/lab';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {Link} from 'react-router-dom';
import {useState} from 'react';

function Signup({login}) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState([]);

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
    if (duplicateEmail > 0) {
      console.log(duplicateEmail.length > 0);
      setErrors(["That account is already in use."]);
      return;
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