import { expect, type Locator, type Page } from '@playwright/test';

import type { CartState, CartTotals } from '../types/cart.types';

export class ShoppingCartPage {
  public constructor(private readonly page: Page) {}

  private get heading(): Locator {
    return this.page.getByRole('heading', { name: 'Your cart' });
  }

  private get quantityInput(): Locator {
    return this.page.getByRole('spinbutton', { name: 'Quantity' });
  }

  private get increaseQuantityButton(): Locator {
    return this.page.getByRole('button', {
      name: 'Increase Canvas Backpack quantity',
    });
  }

  private get decreaseQuantityButton(): Locator {
    return this.page.getByRole('button', {
      name: 'Decrease Canvas Backpack quantity',
    });
  }

  private get lineTotal(): Locator {
    return this.page.getByTestId('line-total');
  }

  private get subtotal(): Locator {
    return this.page.getByTestId('subtotal');
  }

  private get cartTotal(): Locator {
    return this.page.getByTestId('cart-total');
  }

  private get itemCount(): Locator {
    return this.page.getByTestId('cart-item-count');
  }

  public async open(): Promise<void> {
    await this.page.goto('/');
    await this.expectLoaded();
  }

  public async increaseQuantity(times = 1): Promise<void> {
    await this.clickTimes(this.increaseQuantityButton, times);
  }

  public async decreaseQuantity(times = 1): Promise<void> {
    await this.clickTimes(this.decreaseQuantityButton, times);
  }

  public async getQuantity(): Promise<number> {
    const value = Number(await this.quantityInput.inputValue());

    if (!Number.isInteger(value)) {
      throw new Error(`Expected an integer quantity, received "${value}".`);
    }

    return value;
  }

  public async getTotals(): Promise<CartTotals> {
    const [lineTotal, subtotal, cartTotal] = await Promise.all([
      this.lineTotal.innerText(),
      this.subtotal.innerText(),
      this.cartTotal.innerText(),
    ]);

    return { lineTotal, subtotal, cartTotal };
  }

  public async getItemCount(): Promise<string> {
    return this.itemCount.innerText();
  }

  public async isDecreaseQuantityEnabled(): Promise<boolean> {
    return this.decreaseQuantityButton.isEnabled();
  }

  public async getState(): Promise<CartState> {
    const [quantity, itemCount, totals] = await Promise.all([
      this.getQuantity(),
      this.getItemCount(),
      this.getTotals(),
    ]);

    return { quantity, itemCount, ...totals };
  }

  public async expectLoaded(): Promise<void> {
    await expect(this.heading).toBeVisible();
    await expect(this.quantityInput).toBeVisible();
  }

  public async expectState(expected: CartState): Promise<void> {
    await expect(this.quantityInput).toHaveValue(String(expected.quantity));
    await expect(this.itemCount).toHaveText(expected.itemCount);
    await expect(this.lineTotal).toHaveText(expected.lineTotal);
    await expect(this.subtotal).toHaveText(expected.subtotal);
    await expect(this.cartTotal).toHaveText(expected.cartTotal);
  }

  public async expectMinimumQuantityEnforced(): Promise<void> {
    await expect(this.decreaseQuantityButton).toBeDisabled();
    await expect(this.quantityInput).toHaveAttribute('min', '1');
    await expect(this.quantityInput).toHaveValue('1');
  }

  private async clickTimes(locator: Locator, times: number): Promise<void> {
    if (!Number.isInteger(times) || times < 1) {
      throw new Error(`Click count must be a positive integer, received "${times}".`);
    }

    for (let index = 0; index < times; index += 1) {
      await locator.click();
    }
  }
}
