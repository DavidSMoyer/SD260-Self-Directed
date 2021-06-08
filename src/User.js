import {Avatar, Button} from '@material-ui/core';
import {useParams, Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import PostList from './PostList.js';

function User({user}) {
  const [account, setAccount] = useState(undefined);
  const { accountId } = useParams();

  useEffect(() => {
    (async () => {
      const accountReq = await fetch(`http://localhost:5000/users/${accountId}`).then(response => response.json());
      setAccount(accountReq);
    })();
  }, [accountId])

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
              <span className="followers">{0} Followers</span>
              <span className="following">{0} Following</span>
              <span className="karma">{0} Karma</span>
            </div>
            {account.id !== user.id && <Button variant="contained">{user.following.includes(account.id) ? "UNFOLLOW" : "FOLLOW"}</Button>}
          </div>
          <PostList type="owned" user={user} account={account} />
        </div>
      }
    </>
  )
}

export default User;