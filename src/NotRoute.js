import {useLocation} from 'react-router-dom';

function NotRoute({children, path, replace}) {
  const location = useLocation();
  let output;

  if (Array.isArray(path) && path.includes(location.pathname) || location.pathname === path) {
    output = replace === "true" ? <div></div> : "";
  } else {
    output = children;
  }

  return (
    <>
      {output}
    </>
  )
}

export default NotRoute;