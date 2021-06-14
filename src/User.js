import {Avatar, Button} from '@material-ui/core';
import {useParams, Link, useHistory} from 'react-router-dom';
import {useState, useEffect} from 'react';
import PostList from './PostList.js';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';

function User({user, setUser, alert}) {
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
      alert(account.id, "New Follower", `${user.username} is now following you.`, `/user/${user.id}`);
    }
  }

  useEffect(() => {
    updateFollowers();
  }, [user, account])

  const updateFollowers = async () => {
    const userReq = await fetch("http://localhost:5000/users").then(response => response.json());
    const following = userReq.filter(user => user.following.includes(parseInt(accountId)));
    setFollowers(following.length);
  }

  return (
    <>
      {
        account !== undefined &&
        <div className="account-page">
          <div className="account">
            <div className="account-details">
              <Avatar src={account.imageURL} className="user-avatar">{(account.imageURL === "" || account.imageURL === undefined) && account.username[0].toUpperCase()}</Avatar>
              <span className="username">{account.username}</span>
            </div>
            <div className="stats">
              <span className="followers">{followers} Follower{followers !== 1 && "s"}</span>
              <span className="following">{account.following.length} Following</span>
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