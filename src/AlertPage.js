import Alert from './Alert.js';

function AlertPage({user}) {
  return (
    <div className="alert-page">
      <h2>Alerts</h2>
      <ul>
        {user.alerts.map(alert => <Alert alert={alert} />)}
      </ul>
    </div>
  )
}

export default AlertPage;