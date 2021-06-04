import {TextField, InputAdornment, Button} from '@material-ui/core';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {Link} from 'react-router-dom';
import {useState} from 'react';

function Signup({login}) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    login(email, password);
  }

  return (
    <form class="account-form" onSubmit={signIn}>
      <h1>Sign Up</h1>
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
      />
      <input type="submit" value="Submit" />
      <p>Already have an account? <Link to="/login">Login.</Link></p>
    </form>
  )
}

export default Signup;