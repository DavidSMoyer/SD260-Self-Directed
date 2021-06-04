import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';

function SmallAcc({owner}) {
  return (
    <Link to={`/user/${"placeholder"}`}>
      <p>{owner.name}</p>
      <Avatar className="small-avatar" src={owner.img} >{owner.img === "" && owner.name[0].toUpperCase()}</Avatar>
    </Link>
  )
}

export default SmallAcc;