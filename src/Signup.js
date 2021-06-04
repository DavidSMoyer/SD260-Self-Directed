import {TextField, InputAdornment, Button} from '@material-ui/core';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {Link} from 'react-router-dom';

function Signup() {
  return (
    <form class="account-form" onSubmit={(e) => {e.preventDefault(); alert("test")}}>
      <h1>Sign Up</h1>
      <span>
        <TextField required label="First Name" />
        <TextField required label="Last Name" />
      </span>
      <TextField required label="Username" />
      <TextField required label="Email" />
      <TextField 
        required
        label="Password"
        InputProps={{endAdornment: (
          <InputAdornment position="end"><VisibilityOffIcon /></InputAdornment>
        )}}
      />
      <input type="submit" value="Submit" />
      <p>Already have an account? <Link to="/login">Login.</Link></p>
    </form>
  )
}

export default Signup;