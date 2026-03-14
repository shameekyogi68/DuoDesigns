/**
 * @file         useOrders.js
 * @description  Hook for fetching user order history.
 *
 * @module       hooks/useOrders
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

import { useQuery } from '@tanstack/react-query';
import { MOCK_ORDERS } from '../mock/orders.mock';

export const useOrders = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            await new Promise(r => setTimeout(r, 800));
            return MOCK_ORDERS;
        }
    });
};
