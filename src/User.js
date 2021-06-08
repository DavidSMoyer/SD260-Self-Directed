import {Avatar} from '@material-ui/core';
import {useParams, Link} from 'react-router-dom';
import {useState, useEffect} from 'react';

function User({user}) {
  const [account, setAccount] = useState(undefined);
  const { accountId } = useParams();

  useEffect(() => {
    (async () => {
      const accountReq = await fetch(`http://localhost:5000/users/${accountId}`).then(response => response.json());
      setAccount(accountReq);
    })();
  })

  return (
    <>
      {
        account !== undefined &&
        <div className="account-page">
          <div className="account">
            <Avatar src={account.imageURL}>{account.imageURL === "" && account.username[0].toUpperCase()}</Avatar>
            <span className="username">{account.username}</span>
          </div>

        </div>
      }
    </>
  )
}

export default User;