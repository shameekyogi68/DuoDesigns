/**
 * @file         OTPInput.jsx
 * @description  Custom numeric input field for handling multi-digit verification codes.
 *               Supports auto-focus progression and backspace navigation.
 *
 * @module       components/ui/OTPInput
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-09
 *
 * @dependencies
 *   - react (useRef)
 *
 * @notes
 *   - Restricts input to numeric characters only.
 *   - Synchronized with the parent's state via onChange callback.
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * @component OTPInput
 * @description Renders a series of individual digit inputs for OTP verification.
 *
 * @param {Object} props - Component props
 * @param {number} [props.length=6] - Number of digit boxes to render
 * @param {string} props.value - Current combined OTP string
 * @param {function} props.onChange - Callback fired on every digit change
 * @param {boolean} [props.disabled=false] - If true, prevents interaction
 *
 * @returns {JSX.Element} Flex container of individual digit input fields
 *
 * @example
 *   <OTPInput length={6} value={otp} onChange={setOtp} />
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

OTPInput.propTypes = {
    length: PropTypes.number,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};
