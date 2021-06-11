import {TextField, InputAdornment, Avatar} from '@material-ui/core';
import {Alert, AlertTitle} from '@material-ui/lab';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {Link, useHistory} from 'react-router-dom';
import {useState} from 'react';
import {hashSync} from 'bcryptjs';
import { useEffect } from 'react';

function Settings({user, setUser}) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState([]);
  const [passVisible, setPassVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [accountResponse, setAccountResponse] = useState({severity: "none", message: "", title: ""});
  const [emailResponse, setEmailResponse] = useState({severity: "none", message: "", title: ""});
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

  const accountSubmit = (e) => {
    e.preventDefault();
    (async () => {
      const changeAccount = await fetch(`http://localhost:5000/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({fname, lname, username})
      });
      if (changeAccount.ok === true) {
        setUser({...user, fname, lname, username});
        setAccountResponse({severity: "success", title: "Success!", message: "Account settings successfully updated."});
      } else {
        setAccountResponse({severity: "error", title: "Error", message: "Something went wrong."});
      }
    })();
  }

  const emailSubmit = (e) => {
    e.preventDefault();
    if (newEmail === user.email) {
      setEmailResponse({severity: "error", title: "Invalid Email", message: "Must change email to a new email."});
      return;
    }
    (async () => {
      const duplicates = await fetch(`http://localhost:5000/users?email=${newEmail}`).then(response => response.json());
      if (duplicates.length > 0) {
        setEmailResponse({severity: "error", title: "Invalid Email", message: "That email is already in use."});
        return;
      }
      const updateEmail = await fetch(`http://localhost:5000/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({email: newEmail})
      })
      console.log(updateEmail)
      if (updateEmail.ok === true) {
        setUser({...user, email: newEmail});
        setEmail(newEmail);
        setNewEmail("");
        setEmailResponse({severity: "success", title: "Success!", message: "Email successfully updated."});
      } else {
        setEmailResponse({severity: "error", title: "Error", message: "Something went wrong."});
      }
    })();
  }

  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <form onSubmit={accountSubmit}>
        <h3>Update Account</h3>
        {
          accountResponse.severity !== "none" &&
          <Alert severity={accountResponse.severity}>
            <AlertTitle>{accountResponse.title}</AlertTitle>
            {accountResponse.message}
          </Alert>
        }
        <span>
          <TextField required label="First Name" onChange={(e) => setFname(e.target.value)} value={fname} />
          <TextField required label="Last Name" onChange={(e) => setLname(e.target.value)} value={lname} />
        </span>
        <TextField required label="Username" onChange={(e) => update(e, setUsername, 20)} value={username} />
        <input type="submit" value="Submit" />
      </form>
      <form onSubmit={emailSubmit}>
        <h3>Change Email</h3>
        {
          emailResponse.severity !== "none" &&
          <Alert severity={emailResponse.severity}>
            <AlertTitle>{emailResponse.title}</AlertTitle>
            {emailResponse.message}
          </Alert>
        }
        <TextField required label="Email" disabled value={email} />
        <TextField required label="New Email" onChange={e => setNewEmail(e.target.value)}  value={newEmail} />
        <input type="submit" value="Submit" />
      </form>
      <form>
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
        <input type="submit" value="Submit" />
      </form>
      <form>
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