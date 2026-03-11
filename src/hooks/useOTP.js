import { useState, useEffect, useRef } from 'react';

/**
 * Hook to manage OTP countdown timer, resend logic, and attempt tracking.
 * Matches original login.html logic for timer (10:00 -> 0:00)
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
