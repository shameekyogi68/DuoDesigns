import React, { useRef } from 'react';

/**
 * Reusable 6-Box OTP format component matches login.html
 */
export default function OTPInput({ length = 6, value, onChange, disabled }) {
    const inputs = useRef([]);

    const handleChange = (e, index) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        const val = e.target.value;

        let otpArray = value ? value.split('') : new Array(length).fill('');
        otpArray[index] = val;
        onChange(otpArray.join(''));

        // Auto-move forward
        if (val && index < length - 1) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // Auto-move back on Backspace if empty
        if (e.key === 'Backspace' && !value[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    return (
        <div className="otp-inputs">
            {Array.from({ length }).map((_, idx) => (
                <input
                    key={idx}
                    type="text"
                    maxLength="1"
                    className="otp-input"
                    value={value[idx] || ''}
                    onChange={(e) => handleChange(e, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    ref={(el) => (inputs.current[idx] = el)}
                    disabled={disabled}
                />
            ))}
        </div>
    );
}
