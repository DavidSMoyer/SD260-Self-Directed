import {TextField, InputAdornment, Avatar} from '@material-ui/core';
import {Alert, AlertTitle} from '@material-ui/lab';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {Link, useHistory} from 'react-router-dom';
import {useState} from 'react';
import {hashSync} from 'bcryptjs';
import { useEffect } from 'react';

function Settings({user}) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState([]);
  const [passVisible, setPassVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const history = useHistory();

  useEffect(() => {
    setFname(user.fname);
    setLname(user.lname);
    setUsername(user.username);
    setEmail(user.email);
    setImageURL(user.imageURL);
  }, [])

  const update = (e, func, max) => {
    if (e.target.value.length > max) {
      func(e.target.value.substr(0, max));
    } else {
      func(e.target.value);
    }
  }

  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <form>
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
          <TextField required label="First Name" onChange={(e) => setFname(e.target.value)} value={fname} />
          <TextField required label="Last Name" onChange={(e) => setLname(e.target.value)} value={lname} />
        </span>
        <TextField required label="Username" onChange={(e) => update(e, setUsername, 20)} value={username} />
        <h3>Change Email</h3>
        <TextField required label="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
        <h3>Change Password</h3>
        <TextField 
          required
          label="Password"
          InputProps={{endAdornment: (
            <InputAdornment position="end" className="pass-toggle" onClick={() => setPassVisible(!passVisible)}>{passVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}</InputAdornment>
          )}}
          onChange={(e) => update(e, setPassword, 50)}
          type={passVisible ? "text" : "password"}
          value={password}
        />
        <TextField 
          required
          label="Confirm Password"
          InputProps={{endAdornment: (
            <InputAdornment position="end" className="pass-toggle" onClick={() => setConfirmVisible(!confirmVisible)}>{confirmVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}</InputAdornment>
          )}}
          onChange={(e) => update(e, setConfirm, 50)}
          type={confirmVisible ? "text" : "password"}
          value={confirm}
        />
        <h3>Change Profile</h3>
        <span className="img-section">
          <Avatar src={imageURL} className="preview" />
          <TextField label="Image URL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
        </span>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Settings;