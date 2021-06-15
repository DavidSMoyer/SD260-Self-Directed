import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function SmallAcc({owner}) {
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const infoReq = await fetch(`http://localhost:5000/users/${owner}`).then(response => response.json());
      console.log(infoReq);
      setImg(infoReq.imageURL);
      setName(infoReq.username);
    })();
  });

  return (
    name !== "" &&
    <Link to={`/user/${owner}`} className="small-acc">
      <p>{name}</p>
      <Avatar className="small-avatar" src={img} >{(img === "" || img === undefined) && name[0].toUpperCase()}</Avatar>
    </Link>
  )
}

export default SmallAcc;