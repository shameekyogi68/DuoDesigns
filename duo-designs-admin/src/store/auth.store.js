/** @file auth.store.js */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '@/api';

export const useAdminAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (userData, token) => set({ user: userData, token, isAuthenticated: true }),
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        localStorage.removeItem('duo-admin-auth');
        window.location.href = '/login';
      },
      updateUser: (data) => set((state) => ({ user: { ...state.user, ...data } }))
    }),
    {
      name: 'duo-admin-auth',
    }
  )
);
