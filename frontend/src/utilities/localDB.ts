interface UserState {
    id: string;
    email: string;
    name: string;
    isAuthenticated: boolean;
  }
  
  const LOCAL_STORAGE_KEY = 'userState';
  
  const getUserState = (): UserState | null => {
    const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedValue) {
      return JSON.parse(storedValue) as UserState;
    }
    return null;
  };
  
  const setUserState = (userState: UserState): void => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userState));
  };
  
  const clearUserState = (): void => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };
  
  const login = (id: string, email: string, name: string): void => {
    const userState: UserState = {
      id,
      email,
      name,
      isAuthenticated: true,
    };
    setUserState(userState);
  };
  
  const logout = (): void => {
    clearUserState();
  };
  
  const localDB = {
    get: getUserState,
    set: setUserState,
    clear: clearUserState,
    login,
    logout,
  };
  
  export default localDB;
  