/**
 * @file         authStore.js
 * @description  Global authentication state management for Duo Designs.
 *               Handles user profile data, login status, and JWT tokens.
 *
 * @module       store/authStore
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-09
 *
 * @dependencies
 *   - zustand (create)
 *   - zustand/middleware (persist)
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * @store authStore
 * @description Global authentication state using Zustand.
 *              Persisted to localStorage as 'duo-auth-storage'.
 *
 * @state {Object|null} user        - Authenticated user profile data
 * @state {boolean}     isLoggedIn  - Authentication status flag
 * @state {string|null} token       - JWT session token
 *
 * @action login(userData, token)   - Sets user data and token, marks as logged in
 * @action logout()                 - Clears all auth data and marks as logged out
 * @action updateUser(newUserData)  - Updates existing user profile fields
 */
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
