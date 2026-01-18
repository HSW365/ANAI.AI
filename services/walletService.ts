
export type WalletState = {
  address: string | null;
  isConnected: boolean;
  chainId: string | null;
};

class WalletService {
  private listeners: ((state: WalletState) => void)[] = [];
  private state: WalletState = {
    address: null,
    isConnected: false,
    chainId: null,
  };

  constructor() {
    this.checkConnection();
    // Fix: Access ethereum via window cast to any to resolve TS property missing error
    const eth = (window as any).ethereum;
    if (eth) {
      eth.on('accountsChanged', (accounts: string[]) => {
        this.updateState({ 
          address: accounts[0] || null, 
          isConnected: accounts.length > 0 
        });
      });
      eth.on('chainChanged', (chainId: string) => {
        this.updateState({ chainId });
      });
    }
  }

  private async checkConnection() {
    // Fix: Access ethereum via window cast to any to resolve TS property missing error
    const eth = (window as any).ethereum;
    if (eth) {
      try {
        const accounts = await eth.request({ method: 'eth_accounts' });
        const chainId = await eth.request({ method: 'eth_chainId' });
        if (accounts.length > 0) {
          this.updateState({ address: accounts[0], isConnected: true, chainId });
        }
      } catch (e) {
        console.error("Wallet check failed", e);
      }
    }
  }

  async connect(): Promise<string | null> {
    // Fix: Access ethereum via window cast to any to resolve TS property missing error
    const eth = (window as any).ethereum;
    if (!eth) {
      alert("No Ethereum wallet found. Please install MetaMask or similar.");
      return null;
    }
    try {
      const accounts = await eth.request({ method: 'eth_requestAccounts' });
      const chainId = await eth.request({ method: 'eth_chainId' });
      this.updateState({ address: accounts[0], isConnected: true, chainId });
      return accounts[0];
    } catch (e) {
      console.error("User rejected connection", e);
      return null;
    }
  }

  private updateState(newState: Partial<WalletState>) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  private notify() {
    this.listeners.forEach(cb => cb(this.state));
  }

  subscribe(callback: (state: WalletState) => void) {
    this.listeners.push(callback);
    callback(this.state);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  getState() {
    return this.state;
  }
}

export const walletService = new WalletService();
