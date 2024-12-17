import notifyIcon from '../assets/notify.svg';
import notifyActiveIcon from '../assets/notified.svg';
import { useState } from 'react';
export default function NotifyButton() {
 const [isNotified, setIsNotified] = useState(false);

  const handleNotifyClick = () => {
    setIsNotified(!isNotified);
  };

  return (
    <img
      src={isNotified ? notifyActiveIcon : notifyIcon} 
      alt="Notify"
      onClick={handleNotifyClick}
      className="w-6 h-6 cursor-pointer transition-transform transform hover:scale-110"
    />
  );
}
