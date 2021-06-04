import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';

function SmallAcc({name, img}) {
  return (
    <Link to={`/user/${"placeholder"}`}>
      <p>{name}</p>
      <Avatar className="small-avatar" src={img} >{img === "" && name[0].toUpperCase()}</Avatar>
    </Link>
  )
}

export default SmallAcc;