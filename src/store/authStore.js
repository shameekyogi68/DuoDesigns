import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isLoggedIn: false,
            token: null,

            login: (userData, token) => set({
                user: userData,
                isLoggedIn: true,
                token: token,
            }),

            logout: () => set({
                user: null,
                isLoggedIn: false,
                token: null,
            }),

            updateUser: (newUserData) => set((state) => ({
                user: { ...state.user, ...newUserData },
            })),
        }),
        {
            name: 'duo-auth-storage', // unique name
        }
    )
);
