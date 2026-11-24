
import { isOwner, onOwnerChange } from './ownerService';

export const CREDITS_KEY = 'anai_neural_credits';
// Same "unlimited" value the VIP plan uses; shown as ∞ / UNLIMITED in the app.
export const UNLIMITED_CREDITS = 999;

class CreditService {
  private listeners: ((credits: number) => void)[] = [];

  constructor() {
    // Initialize with 5 free trial credits if new user
    if (localStorage.getItem(CREDITS_KEY) === null) {
      this.setCredits(5);
    }
    // Owner signed in or out with the owner PIN: refresh every balance on screen.
    onOwnerChange(() => this.notifyListeners());
  }

  getCredits(): number {
    // The owner has VIP all access: unlimited credits, nothing is ever deducted.
    if (isOwner()) return UNLIMITED_CREDITS;
    return parseInt(localStorage.getItem(CREDITS_KEY) || '0');
  }

  setCredits(amount: number) {
    localStorage.setItem(CREDITS_KEY, amount.toString());
    this.notifyListeners();
  }

  consumeCredit(): boolean {
    if (isOwner()) return true;
    const current = this.getCredits();
    if (current > 0) {
      this.setCredits(current - 1);
      return true;
    }
    return false;
  }

  subscribe(callback: (credits: number) => void) {
    this.listeners.push(callback);
    callback(this.getCredits());
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  private notifyListeners() {
    const current = this.getCredits();
    this.listeners.forEach(cb => cb(current));
  }
}

export const creditService = new CreditService();
