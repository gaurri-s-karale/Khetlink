import React from 'react';
import { useApp, AppView } from '../../context/AppContext';
import { X, CheckCircle, Bell, TrendingUp, Tag, Users, Truck } from 'lucide-react';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationAsRead, setCurrentView } = useApp();

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'price_alert':
        return <TrendingUp className="w-4 h-4 text-gov-agri" />;
      case 'buyer_offer':
        return <Tag className="w-4 h-4 text-gov-accent" />;
      case 'buyer_match':
        return <Users className="w-4 h-4 text-gov-secondary" />;
      case 'logistics':
        return <Truck className="w-4 h-4 text-gov-primary" />;
      default:
        return <Bell className="w-4 h-4 text-gov-muted" />;
    }
  };

  const handleNotificationClick = (id: string, target?: string) => {
    markNotificationAsRead(id);
    if (target) {
      setCurrentView(target as AppView);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white h-full shadow-gov-lg flex flex-col border-l border-gov-border">
        {/* Header */}
        <div className="p-4 border-b border-gov-border flex items-center justify-between bg-gov-bg">
          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4 text-gov-primary" />
            <h3 className="text-sm font-bold text-gov-primary">Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-gov-muted hover:text-gov-text hover:bg-gov-border/50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-gov-border p-2">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-gov-muted text-xs">
              No recent notifications.
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => handleNotificationClick(n.id, n.actionTarget)}
                className={`p-3 rounded hover:bg-gov-lightBlue/40 cursor-pointer transition flex items-start space-x-3 ${
                  !n.read ? 'bg-gov-lightBlue/20 font-medium' : ''
                }`}
              >
                <div className="mt-0.5 p-1.5 rounded-full bg-white border border-gov-border shadow-xs">
                  {getIcon(n.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-gov-text truncate">{n.title}</p>
                    <span className="text-[10px] text-gov-muted">{n.timestamp}</span>
                  </div>
                  <p className="text-xs text-gov-muted mt-0.5 line-clamp-2">{n.message}</p>
                  {n.actionTarget && (
                    <span className="inline-block mt-1 text-[11px] text-gov-secondary hover:underline">
                      View details →
                    </span>
                  )}
                </div>
                {!n.read && (
                  <span className="w-2 h-2 rounded-full bg-gov-accent flex-shrink-0 mt-1.5" />
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gov-border bg-gov-bg text-center">
          <p className="text-[11px] text-gov-muted">
            Notifications are synchronized with live market alerts and trade events.
          </p>
        </div>
      </div>
    </div>
  );
};
