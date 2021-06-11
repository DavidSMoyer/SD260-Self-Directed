import {Link} from 'react-router-dom';

function Alert({alert}) {
  return (
    <li className={alert.seen ? "" : "new"}>
      <Link to={alert.redirect}>
        <h2>{alert.title}</h2>
        <p>{alert.description}</p>
      </Link>
    </li>
  )
}

export default Alert;