import React from 'react';
import EditableScorecard from './EditableScorecard';
import EditableIndicators from './EditableIndicators';

const appStyles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
  },
  header: {
    marginBottom: '30px',
    textAlign: 'center'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px'
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '20px'
  },
  notificationBar: {
    padding: '12px 16px',
    backgroundColor: '#d4edda',
    border: '1px solid #c3e6cb',
    borderRadius: '4px',
    color: '#155724',
    marginBottom: '20px',
    display: 'none',
    animation: 'slideDown 0.3s ease-out',
    '@keyframes slideDown': {
      from: { transform: 'translateY(-20px)', opacity: 0 },
      to: { transform: 'translateY(0)', opacity: 1 }
    }
  }
};

function App() {
  React.useEffect(() => {
    // Setup global notification function
    window.notifyChange = (message) => {
      const notif = document.getElementById('notification');
      if (notif) {
        notif.textContent = message;
        notif.style.display = 'block';
        setTimeout(() => {
          notif.style.display = 'none';
        }, 3000);
      }
    };
  }, []);

  return (
    <div style={appStyles.container}>
      <div style={appStyles.header}>
        <h1 style={appStyles.title}>Global Talent Competitiveness Dashboard</h1>
        <p style={appStyles.subtitle}>
          Edit and manage your talent competitiveness metrics below
        </p>
      </div>

      <div id="notification" style={appStyles.notificationBar}></div>

      {/* Main Scorecard Section */}
      <EditableScorecard />

      {/* Detailed Indicators Section */}
      <EditableIndicators />

      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        textAlign: 'center',
        color: '#666',
        fontSize: '14px'
      }}>
        <p>
          💾 All changes are automatically saved to your browser's local storage
        </p>
        <p style={{ marginTop: '10px', fontSize: '12px', color: '#999' }}>
          Dashboard Version 1.0 | React + JSS Powered
        </p>
      </div>
    </div>
  );
}

export default App;
