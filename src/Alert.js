import {Link} from 'react-router-dom';

function Alert({alert}) {
  return (
    <li>
      <Link to="/redirect">
        <h2>Title</h2>
        <p>Description</p>
      </Link>
    </li>
  )
}

export default Alert;