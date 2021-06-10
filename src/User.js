import {Avatar, Button} from '@material-ui/core';
import {useParams, Link, useHistory} from 'react-router-dom';
import {useState, useEffect} from 'react';
import PostList from './PostList.js';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';

function User({user, setUser}) {
  const [account, setAccount] = useState(undefined);
  const [followers, setFollowers] = useState(0);
  const { accountId } = useParams();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const accountReq = await fetch(`http://localhost:5000/users/${accountId}`).then(response => response.json());
      setAccount(accountReq);
    })();
  }, [accountId, user]);

  const toggleFollow = () => {
    if (user.following.includes(account.id)) {
      setUser({...user, following: user.following.filter(filterUser => filterUser !== account.id)});
    } else {
      setUser({...user, following: [...user.following, account.id]});
    }
  }

  useEffect(() => {
    (async () => {
      const expire = JSON.parse(localStorage.getItem("auto-login")).expire;
      localStorage.setItem("auto-login", JSON.stringify({user, expire}));
      const patchReq = await fetch("http://localhost:5000/users/2",
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({following: user.following})
      });
      const response = await patchReq.json();
      console.log(response);
    })();
  }, [user]);

  return (
    <>
      {
        account !== undefined &&
        <div className="account-page">
          <div className="account">
            <div className="account-details">
              <Avatar src={account.imageURL}>{account.imageURL === "" && account.username[0].toUpperCase()}</Avatar>
              <span className="username">{account.username}</span>
            </div>
            <div className="stats">
              <span className="followers">{followers} Followers</span>
              <span className="following">{account.following.length} Following</span>
              <span className="karma">{account.karma} Karma</span>
              {account.id === user.id && <Link to="/settings"><SettingsApplicationsIcon /></Link>}
            </div>
            {account.id !== user.id && <Button variant="contained" onClick={toggleFollow}>{user.following.includes(account.id) ? "UNFOLLOW" : "FOLLOW"}</Button>}
          </div>
          <PostList type="owned" user={user} account={account} setUser={setUser} />
        </div>
      }
    </>
  )
}

export default User;