import { test } from './fixtures/cart.fixture';
import { CART_STATES } from './test-data/cart.data';

test.describe('Demo application seed', () => {
  test('opens the shopping cart in a fresh state', async ({ shoppingCartPage }) => {
    await shoppingCartPage.open();

    await shoppingCartPage.expectState(CART_STATES.initial);
  });
});
