export class AppStore {
  static get(key) {
    try {
      const storedItem = window.localStorage.getItem(key);
      return storedItem ? JSON.parse(storedItem) : null;
    } catch (error) {
      console.error(`Error getting localStorage item "${key}":`, error);
      return {};
    }
  }

  static set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage item "${key}":`, error);
    }
  }

  static remove(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage item "${key}":`, error);
    }
  }

  static clear() {
    try {
      window.localStorage.clear();
    } catch (error) {
      console.error(`Error clearing localStorage:`, error);
    }
  }
}

export function getItem(key) {
  return AppStore.get(key);
}

export function setItem(key, value) {
  AppStore.set(key, value);
}

export function removeItem(key) {
  AppStore.remove(key);
}

export function removeAll() {
  AppStore.clear();
}
