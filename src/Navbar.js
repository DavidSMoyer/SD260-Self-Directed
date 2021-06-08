import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {Badge} from '@material-ui/core';
import {Link} from 'react-router-dom';

function Navbar({user}) {
  return (
    <nav>
      <Link to={`/account/${user.id}`} className="link-icon"><PersonIcon style={{"fontSize": 35}} /></Link>
      <Link to="/follow-timeline" className="link-icon"><EmojiPeopleIcon style={{"fontSize": 35}} /></Link>
      <Link to="/create" className="link-icon"><AddIcon style={{"fontSize": 45}} /></Link>
      <Link to="/" className="link-icon"><HomeIcon style={{"fontSize": 35}} /></Link>
      <Link to="/alerts" className="link-icon">
        <Badge badgeContent={0} color="secondary">
          <NotificationsIcon style={{"fontSize": 35}} />
        </Badge>
      </Link>
    </nav>
  )
}

export default Navbar;