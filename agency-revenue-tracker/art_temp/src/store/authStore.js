import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import bcrypt from 'bcryptjs';

const AGENCY_EMAIL = import.meta.env.VITE_AGENCY_EMAIL || 'agency@domain.com';
const PASSWORD_HASH = import.meta.env.VITE_AGENCY_PASSWORD_HASH || '';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      loginTime: null,
      error: null,

      login: async (email, password) => {
        set({ error: null });
        
        if (email !== AGENCY_EMAIL) {
          set({ error: 'Invalid credentials' });
          return false;
        }

        const isMatch = await bcrypt.compare(password, PASSWORD_HASH);
        if (isMatch) {
          set({ isLoggedIn: true, loginTime: Date.now() });
          return true;
        } else {
          set({ error: 'Invalid credentials' });
          return false;
        }
      },

      logout: () => {
        set({ isLoggedIn: false, loginTime: null });
        localStorage.removeItem('art_auth'); // Force clear on logout
      },

      checkSession: () => {
        const { loginTime, isLoggedIn } = get();
        if (!isLoggedIn) return false;
        
        // 7 days expiry
        const sevenDays = 7 * 24 * 60 * 60 * 1000;
        if (Date.now() - loginTime > sevenDays) {
          get().logout();
          return false;
        }
        return true;
      }
    }),
    {
      name: 'art_auth',
    }
  )
);
