import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface for the user state
interface UserState {
  id: string;
  email: string;
  name: string;
  isAuthenticated: boolean;
}

// Load user state from localStorage
const loadUserState = (): UserState => {
  const storedState = localStorage.getItem('userState');
  if (storedState) {
    try {
      // Use type assertion to ensure the parsed object conforms to UserState
      const parsedState = JSON.parse(storedState) as UserState;
      return parsedState;
    } catch (error) {
      console.error('Failed to parse user state:', error);
      // Return default state in case of parsing error
      return {
        id: '',
        email: '',
        name: '',
        isAuthenticated: false,
      };
    }
  }
  return {
    id: '',
    email: '',
    name: '',
    isAuthenticated: false,
  };
};

// Save user state to localStorage
const saveUserState = (state: UserState) => {
  localStorage.setItem('userState', JSON.stringify(state));
};

// Initial state
const initialState: UserState = loadUserState();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.isAuthenticated = true;
      saveUserState(state); // Save to localStorage
    },
    clearUser: (state) => {
      state.id = '';
      state.email = '';
      state.name = '';
      state.isAuthenticated = false;
      saveUserState(state); // Save to localStorage
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
