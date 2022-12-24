class Storage {
  constructor() {
    this.data = new Map();
  }

  key(n) {
    return [...this.data.keys()][n];
  }
  getItem(key) {
    return this.data.get(key);
  }
  get length() {
    return this.data.size;
  }

  setItem(key, value) {
    this.data.set(key, value);
  }
  removeItem(key) {
    this.data.delete(key);
  }
  clear() {
    this.data = new Map();
  }
}

let sessionStorage = (globalThis.sessionStorage =
  globalThis.sessionStorage ?? new Storage());

export { Storage, sessionStorage };
