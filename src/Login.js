import {TextField, InputAdornment, Button} from '@material-ui/core';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {Link} from 'react-router-dom';

function Login() {

  const login = (e) => {
    
  }

  return (
    <form class="account-form" onSubmit={(e) => {e.preventDefault(); alert("test")}}>
      <h1>Login</h1>
      <TextField required label="Username" />
      <TextField 
        required
        label="Password"
        InputProps={{endAdornment: (
          <InputAdornment position="end"><VisibilityOffIcon /></InputAdornment>
        )}}
      />
      <input type="submit" value="Submit" />
      <p>Don't have an account? <Link to="/signup">Sign up.</Link></p>
    </form>
  )
}

export default Login;