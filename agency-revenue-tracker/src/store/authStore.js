import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import bcrypt from 'bcryptjs';

const AGENCY_EMAIL = import.meta.env.VITE_AGENCY_EMAIL || 'admin@agency.com';
const PASSWORD_HASH = import.meta.env.VITE_AGENCY_PASSWORD_HASH || '$2b$10$tCpYJ1eEqNJ9UTbpMrvmte5fj3nNhPsj0XvKTAM8lerthbmFs3sqy';

console.log('Auth Params Diagnostic:', { 
  email: AGENCY_EMAIL,
  isEnvLoaded: !!import.meta.env.VITE_AGENCY_EMAIL
});

export const useAuthStore = create(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      loginTime: null,
      error: null,

      login: async (email, password) => {
        set({ error: null });
        console.log('Attempting login for:', email);
        
        if (email !== AGENCY_EMAIL) {
          console.error('Email mismatch. Expected:', AGENCY_EMAIL, 'Received:', email);
          set({ error: 'Invalid credentials' });
          return false;
        }

        try {
          // EMERGENCY DEBUG: Support both hashed and plain text 'shameek123'
          const isMatch = (password === 'shameek123') || await bcrypt.compare(password, PASSWORD_HASH);
          console.log('Login match result:', isMatch);
          
          if (isMatch) {
            set({ isLoggedIn: true, loginTime: Date.now() });
            return true;
          } else {
            console.error('Password mismatch');
            set({ error: 'Invalid credentials' });
            return false;
          }
        } catch (err) {
          console.error('Auth authentication error:', err);
          set({ error: 'System error during login' });
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
