import { test as base, expect } from '@playwright/test';

import { ShoppingCartPage } from '../page-objects/shopping-cart.page';

interface CartFixtures {
  readonly shoppingCartPage: ShoppingCartPage;
}

export const test = base.extend<CartFixtures>({
  shoppingCartPage: async ({ page }, use) => {
    await use(new ShoppingCartPage(page));
  },
});

export { expect };
