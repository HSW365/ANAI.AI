
export interface AppNotification {
  id: string;
  title: string;
  body: string;
  timestamp: Date;
  type: 'submission' | 'promo' | 'podcast' | 'system';
  read: boolean;
}

class NotificationService {
  private listeners: ((notifications: AppNotification[]) => void)[] = [];
  private notifications: AppNotification[] = [
    {
      id: '1',
      title: 'Welcome to Hoodstar365 AI',
      body: 'Tap to explore the AI Lab and analyze your first track.',
      timestamp: new Date(),
      type: 'system',
      read: false
    },
    {
      id: '2',
      title: 'New Podcast: The AI Era',
      body: 'Episode 43: How Gemini is changing the indie game.',
      timestamp: new Date(Date.now() - 3600000),
      type: 'podcast',
      read: false
    }
  ];

  subscribe(callback: (notifications: AppNotification[]) => void) {
    this.listeners.push(callback);
    callback([...this.notifications]);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('This browser does not support desktop notification');
      return false;
    }

    const permission = await window.Notification.requestPermission();
    if (permission === 'granted') {
      this.addNotification({
        id: Math.random().toString(36).substr(2, 9),
        title: 'Notifications Enabled',
        body: 'You will now receive updates on submissions and drops.',
        timestamp: new Date(),
        type: 'system',
        read: false
      });
      return true;
    }
    return false;
  }

  addNotification(notification: AppNotification) {
    this.notifications = [notification, ...this.notifications];
    this.notifyListeners();
    
    if (window.Notification?.permission === 'granted') {
      new window.Notification(notification.title, { body: notification.body });
    }
  }

  markAsRead(id: string) {
    this.notifications = this.notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    this.notifyListeners();
  }

  private notifyListeners() {
    this.listeners.forEach(callback => callback([...this.notifications]));
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }
}

export const notificationService = new NotificationService();
