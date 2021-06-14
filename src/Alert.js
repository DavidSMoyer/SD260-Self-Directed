import {Link} from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';

function Alert({alert, remove}) {
  const clickDelete = (e) => {
    e.preventDefault();
    remove(alert.id);
  }

  return (
    <li className={alert.seen ? "alert" : "alert new"}>
      <Link to={alert.redirect}>
        <h2>{alert.title}</h2>
        <p>{alert.message}</p>
        <button onClick={clickDelete}><CloseIcon /></button>
      </Link>
    </li>
  )
}

export default Alert;