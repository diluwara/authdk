import { RootState } from 'store';

export const getUserName = (state: RootState): string => state.user.name;
export const getUserEmail = (state: RootState): string => state.user.email;
export const getUserId = (state: RootState): string => state.user.id;
