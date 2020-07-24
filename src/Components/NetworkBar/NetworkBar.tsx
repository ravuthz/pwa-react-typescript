import React from "react";
import { Alert } from "antd";
import { useNetwork } from "../../hooks/custom.hook";
import { useSelector } from "react-redux";

const NetworkBar: React.FC = () => {
  const { isOnline } = useNetwork();

  const isServiceWorkerInitialized = useSelector<any>(
    state => state.serviceWorkerInitialized
  );

  const isServiceWorkerUpdated = useSelector<any>(
    state => state.serviceWorkerUpdated
  );

  const serviceWorkerRegistration: any = useSelector<any>(
    state => state.serviceWorkerRegistration
  );

  const updateServiceWorker = () => {
    const registrationWaiting = serviceWorkerRegistration.waiting;
    if (registrationWaiting) {
      registrationWaiting.postMessage({ type: 'SKIP_WAITING' });
      registrationWaiting.addEventListener('statechange', (event: any) => {
        if (event.target.state === 'activated') {
          window.location.reload();
        }
      });
    }
  };

  return (
    <React.Fragment>
      {isServiceWorkerInitialized && (
        <Alert message="Page has been saved for offline use" type="success" showIcon/>
      )}
      {isServiceWorkerUpdated && (
        <Alert
          message="There is a new version available."
          type="success" showIcon
          closeText="Update Now"
          onClose={updateServiceWorker}
        />
      )}
      {isOnline ? (
        <Alert message="You're online now" type="success" showIcon/>
      ) : (
        <Alert message="You're offline now" type="error" showIcon/>
      )}
    </React.Fragment>
  );
};

export default NetworkBar;
