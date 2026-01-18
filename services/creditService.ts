
export const CREDITS_KEY = 'anai_neural_credits';

class CreditService {
  private listeners: ((credits: number) => void)[] = [];

  constructor() {
    // Initialize with 5 free trial credits if new user
    if (localStorage.getItem(CREDITS_KEY) === null) {
      this.setCredits(5);
    }
  }

  getCredits(): number {
    return parseInt(localStorage.getItem(CREDITS_KEY) || '0');
  }

  setCredits(amount: number) {
    localStorage.setItem(CREDITS_KEY, amount.toString());
    this.notifyListeners();
  }

  consumeCredit(): boolean {
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
