import { useEffect, useState } from 'react';
import SmallAcc from './SmallAcc.js';

function UserList({query, user}) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const userReq = await fetch(`http://localhost:5000/users`).then(response => response.json());
      const filtered = userReq.filter(filterUser => filterUser.username.toLowerCase().includes(query.toLowerCase()) && filterUser.id !== user.id);
      setUsers(filtered);
    })();
  }, [query])

  return (
    <div className="user-list">
      {users.map(user => <SmallAcc owner={{id: user.id, name: user.username}} />)}
    </div>
  )
}

export default UserList;