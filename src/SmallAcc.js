import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function SmallAcc({owner}) {
  const [img, setImg] = useState("");

  useEffect(() => {
    (async () => {
      const imgReq = await fetch(`http://localhost:5000/users/${owner.id}`).then(response => response.json());
      setImg(imgReq.imageURL);
    })();
  })

  return (
    <Link to={`/user/${owner.id}`} className="small-acc">
      <p>{owner.name}</p>
      <Avatar className="small-avatar" src={img} >{img === "" && owner.name[0].toUpperCase()}</Avatar>
    </Link>
  )
}

export default SmallAcc;