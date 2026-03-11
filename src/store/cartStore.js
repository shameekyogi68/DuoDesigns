import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { calculateGST } from '../utils/gst';

export const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],
            appliedCoupon: null,
            shippingCharge: 0,
            customerState: '', // Needed for GST calculation

            addItem: (newItem) => set((state) => {
                // newItem should have { product, variant, qty, design }
                const existingItemIndex = state.items.findIndex(
                    (i) => i.product.id === newItem.product.id && i.variant.id === newItem.variant.id
                );

                let newItems;
                if (existingItemIndex > -1) {
                    newItems = [...state.items];
                    newItems[existingItemIndex].qty += newItem.qty;
                } else {
                    newItems = [...state.items, newItem];
                }
                return { items: newItems };
            }),

            removeItem: (productId, variantId) => set((state) => ({
                items: state.items.filter(
                    (i) => !(i.product.id === productId && i.variant.id === variantId)
                )
            })),

            updateQty: (productId, variantId, qty) => set((state) => ({
                items: state.items.map((i) =>
                    (i.product.id === productId && i.variant.id === variantId)
                        ? { ...i, qty: Math.max(1, qty) }
                        : i
                )
            })),

            clearCart: () => set({
                items: [],
                appliedCoupon: null,
                shippingCharge: 0,
                customerState: ''
            }),

            applyCoupon: (coupon) => set({ appliedCoupon: coupon }),
            removeCoupon: () => set({ appliedCoupon: null }),

            setShippingCharge: (charge) => set({ shippingCharge: charge }),
            setCustomerState: (stateName) => set({ customerState: stateName }),

            getSummary: () => {
                const state = get();
                const totalItems = state.items.reduce((sum, item) => sum + item.qty, 0);
                const subtotal = state.items.reduce((sum, item) => sum + (item.product.price * item.qty), 0);

                let discount = 0;
                if (state.appliedCoupon) {
                    if (state.appliedCoupon.type === 'percentage') {
                        discount = subtotal * (state.appliedCoupon.value / 100);
                    } else if (state.appliedCoupon.type === 'fixed') {
                        discount = state.appliedCoupon.value;
                    }
                }

                const gstBreakdown = calculateGST(subtotal, state.shippingCharge, discount, state.customerState);
                const gstAmount = gstBreakdown.totalGst;

                const finalTotal = subtotal + state.shippingCharge + gstAmount - discount;

                return {
                    totalItems,
                    subtotal,
                    discount,
                    shippingCharge: state.shippingCharge,
                    gstAmount,
                    gstBreakdown,
                    finalTotal
                };
            }
        }),
        {
            name: 'duo-cart-storage',
        }
    )
);
