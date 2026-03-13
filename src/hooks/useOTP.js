/**
 * @file         useOTP.js
 * @description  Custom hook for managing OTP (One-Time Password) lifecycle.
 *               Handles countdown timers, resend availability, and attempt throttling.
 *
 * @module       hooks/useOTP
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-09
 *
 * @dependencies
 *   - react (useState, useEffect, useRef)
 */

import { useState, useEffect, useRef } from 'react';

/**
 * @hook useOTP
 * @description Manages authentication OTP state including timers and security limits.
 *
 * @param {number} [initialTime=600] - Initial countdown time in seconds (default 10 mins).
 * @param {number} [maxAttempts=3] - Maximum failed verification attempts before blocking.
 *
 * @returns {Object} OTP state and control functions:
 *   - {number} timeLeft: Seconds remaining.
 *   - {string} timeFormatted: MM:SS string.
 *   - {boolean} isRunning: Active countdown status.
 *   - {boolean} canResend: If resend is allowed.
 *   - {function} startTimer: Starts the countdown.
 *   - {function} stopTimer: Stops the countdown.
 *   - {number} attempts: Count of failed attempts.
 *   - {boolean} isBlocked: If max attempts exceeded.
 *   - {function} handleAttempt: Updates state based on verification result.
 *
 * @example
 *   const { timeFormatted, startTimer } = useOTP(300);
 */
export const useOTP = (initialTime = 600, maxAttempts = 3) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [isBlocked, setIsBlocked] = useState(false);

    const timerRef = useRef(null);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft <= 0) {
            clearInterval(timerRef.current);
            setIsRunning(false);
        }

        return () => clearInterval(timerRef.current);
    }, [isRunning, timeLeft]);

    const startTimer = () => {
        setTimeLeft(initialTime);
        setIsRunning(true);
    };

    const stopTimer = () => {
        clearInterval(timerRef.current);
        setIsRunning(false);
    };

    const formatTime = () => {
        const m = Math.floor(timeLeft / 60);
        const s = timeLeft % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const handleAttempt = (isValid) => {
        if (!isValid) {
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);
            if (newAttempts >= maxAttempts) {
                setIsBlocked(true);
                stopTimer();
            }
        } else {
            setAttempts(0); // reset on success
        }
    };

    return {
        timeLeft,
        timeFormatted: formatTime(),
        isRunning,
        canResend: !isRunning,
        startTimer,
        stopTimer,
        attempts,
        isBlocked,
        handleAttempt
    };
};
