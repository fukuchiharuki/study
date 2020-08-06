export interface OnlineStatus {
  isOnline: boolean;
}

interface Subscriber {
  id: string;
  handler: (status: OnlineStatus) => void;
}

class ChatAPI {
  private static onlineStatus: Map<string, boolean> = new Map();
  private static subscribers: Subscriber[] = [];

  static subscribeToFriendStatus(id: string, handler: (status: OnlineStatus) => void) {
    this.subscribers = this.subscribers.concat([{ id, handler }]);
    console.log(`subscribed(id=${id}, subscribers=${this.subscribers.length})`);
    this.notify(id, this.onlineStatus.get(id) || false);
  }

  static unsubscribeFromFriendStatus(id: string, handler: (status: OnlineStatus) => void) {
    this.subscribers =
      this.subscribers.filter(it => it.id !== id || it.handler !== handler);
    console.log(`unsubscribed(id=${id}, subscribers=${this.subscribers.length})`);
  }

  static login(id: string) {
    if (this.onlineStatus.get(id)) return;
    this.changeAndNotify(id, true);
  }

  static logout(id: string) {
    if (!this.onlineStatus.get(id)) return;
    this.changeAndNotify(id, false);
  }

  private static changeAndNotify(id: string, isOnline: boolean) {
    this.onlineStatus.set(id, isOnline);
    setTimeout(() => {
      this.notify(id, isOnline);
    }, 500);
  }

  private static notify(id: string, isOnline: boolean) {
    this.subscribers
      .filter(it => it.id === id)
      .forEach(it => it.handler({ isOnline }));
  }
}

export default ChatAPI;