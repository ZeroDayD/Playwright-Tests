export interface CartTotals {
  readonly lineTotal: string;
  readonly subtotal: string;
  readonly cartTotal: string;
}

export interface CartState extends CartTotals {
  readonly quantity: number;
  readonly itemCount: string;
}
