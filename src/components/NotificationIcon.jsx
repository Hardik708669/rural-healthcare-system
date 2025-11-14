import React, { useState, useRef, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { theme } from '../theme';

const NotificationIcon = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Telemedicine Request',
      message: 'Patient John Doe has requested a telemedicine consultation',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      title: 'Reminder: Medication Due',
      message: 'Your daily medication is due in 30 minutes',
      time: '1 hour ago',
      read: true
    },
    {
      id: 3,
      title: 'Health Report Available',
      message: 'Your monthly health report is now available for download',
      time: '2 hours ago',
      read: false
    }
  ]);
  const notificationRef = useRef(null);

  // Close notification panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative" ref={notificationRef}>
      {/* Notification Bell Icon */}
      <button
        onClick={toggleNotification}
        className="relative p-2 text-gray-300 hover:text-white transition-colors duration-300 transform hover:scale-110"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isNotificationOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-800 font-semibold">Notifications</h3>
              <div className="flex gap-2">
                <button 
                  onClick={markAllAsRead}
                  className="text-xs text-teal-600 hover:text-teal-800"
                >
                  Mark all as read
                </button>
                <button 
                  onClick={clearAll}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Clear all
                </button>
              </div>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 border-b border-gray-100 ${!notification.read ? 'bg-gray-50' : ''}`}
                >
                  <div className="flex justify-between">
                    <h4 className="text-gray-800 font-medium text-sm">{notification.title}</h4>
                    {!notification.read && (
                      <button 
                        onClick={() => markAsRead(notification.id)}
                        className="text-xs text-teal-600 hover:text-teal-800"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                  <p className="text-gray-400 text-xs mt-2">{notification.time}</p>
                </div>
              ))
            )}
          </div>
          
          <div className="p-3 text-center border-t border-gray-200">
            <button className="text-teal-600 text-sm hover:text-teal-800">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;