import {Link} from 'react-router-dom';

function Alert({alert}) {
  return (
    <li className={alert.seen ? "alert" : "alert new"}>
      <Link to={alert.redirect}>
        <h2>{alert.title}</h2>
        <p>{alert.message}</p>
      </Link>
    </li>
  )
}

export default Alert;