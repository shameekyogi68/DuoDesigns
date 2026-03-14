/**
 * @file         usePincode.js
 * @description  Custom hook for validating delivery pincodes and calculating shipping.
 *
 * @module       hooks/usePincode
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

import { useState } from 'react';
import { MOCK_PINCODES } from '../mock/pincodes.mock';

export const usePincode = () => {
    const [charge, setCharge] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const checkPincode = async (code) => {
        setIsLoading(true);
        const match = MOCK_PINCODES.find(p => p.code === code);
        setCharge(match ? match.charge : 0);
        setIsLoading(false);
    };

    return { shippingCharge: charge, isLoading, checkPincode };
};
