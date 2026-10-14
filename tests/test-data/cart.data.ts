import type { CartState } from '../types/cart.types';

export const CART_STATES = {
  initial: {
    quantity: 1,
    itemCount: '1 item',
    lineTotal: '$49.00',
    subtotal: '$49.00',
    cartTotal: '$49.00',
  },
  quantityTwo: {
    quantity: 2,
    itemCount: '2 items',
    lineTotal: '$98.00',
    subtotal: '$98.00',
    cartTotal: '$98.00',
  },
} as const satisfies Record<string, CartState>;
