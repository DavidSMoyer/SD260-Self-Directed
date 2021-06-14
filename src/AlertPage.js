import Alert from './Alert.js';
import {useEffect, useState} from 'react';

function AlertPage({user, setUser}) {
  const [alerts, setAlerts] = useState(null);

  useEffect(() => {
    (async () => {
      const req = await fetch(`http://localhost:5000/users/${user.id}`).then(response => response.json());
      setAlerts(req.alerts.map(alert => ({...alert, seen: true})));
    })();
  }, []);

  useEffect(() => {
    if (alerts === null || user === null) return; 
    setUser({...user, alerts});
  }, [alerts]);

  const removeAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  }

  return (
    alerts !== null &&
    <div className="alert-page">
      <h2>Alerts</h2>
      <ul>
        {alerts.map(alert => <Alert alert={alert} key={alert.id} remove={removeAlert} />)}
      </ul>
    </div>
  )
}

export default AlertPage;