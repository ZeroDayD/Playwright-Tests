import { test } from '../fixtures/cart.fixture';
import { CART_STATES } from '../test-data/cart.data';

test.describe('Shopping cart quantity update', () => {
  test.beforeEach(async ({ shoppingCartPage }) => {
    await shoppingCartPage.open();
  });

  test('increases quantity and recalculates totals', async ({ shoppingCartPage }) => {
    await shoppingCartPage.expectState(CART_STATES.initial);

    await shoppingCartPage.increaseQuantity();

    await shoppingCartPage.expectState(CART_STATES.quantityTwo);
  });

  test('decreases quantity and recalculates totals', async ({ shoppingCartPage }) => {
    await shoppingCartPage.increaseQuantity();
    await shoppingCartPage.expectState(CART_STATES.quantityTwo);

    await shoppingCartPage.decreaseQuantity();

    await shoppingCartPage.expectState(CART_STATES.initial);
  });

  test('does not allow quantity below one', async ({ shoppingCartPage }) => {
    await shoppingCartPage.expectMinimumQuantityEnforced();
    await shoppingCartPage.expectState(CART_STATES.initial);
  });
});
