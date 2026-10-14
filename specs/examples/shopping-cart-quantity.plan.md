# Shopping cart quantity update test plan

> **Source:** Portfolio example requirement; no GitHub Issue or pull request exists for this example.
>
> A real run would use `specs/issues/<issue-number>-shopping-cart-quantity.plan.md` and link the Issue here.

## Requirement summary

A user can increase and decrease the quantity of an item in the shopping cart. The displayed item total, subtotal, cart
total, and item count must reflect the selected quantity. Quantity must never become lower than `1`.

## Test configuration

- Application route: `/`
- Scope: Web UI / Chromium
- Environment: Local demo application
- Seed: `tests/seed.spec.ts`
- Product: Canvas Backpack
- Unit price: `$49.00`

## Assumptions

- Every test starts with a fresh browser context and quantity `1`.
- Currency is displayed in US dollars with two decimal places.
- The cart contains one product line; its quantity contributes to the item count.

## Test scenarios

### 1. Increase quantity and recalculate totals

1. Open the shopping cart.
2. Confirm that quantity is `1` and the cart total is `$49.00`.
3. Activate **Increase Canvas Backpack quantity** once.

**Expected results**

- Quantity becomes `2`.
- Item total, subtotal, and cart total each become `$98.00`.
- The cart header displays `2 items`.

### 2. Decrease quantity and recalculate totals

1. Open the shopping cart.
2. Increase the quantity to `2`.
3. Activate **Decrease Canvas Backpack quantity** once.

**Expected results**

- Quantity returns to `1`.
- Item total, subtotal, and cart total each return to `$49.00`.
- The cart header displays `1 item`.

### 3. Enforce the minimum quantity

1. Open the shopping cart at quantity `1`.
2. Inspect **Decrease Canvas Backpack quantity**.

**Expected results**

- The decrease control is disabled.
- Quantity remains `1`.
- Cart total remains `$49.00`.

## Relevant edge cases

- Singular and plural item-count text changes at the `1`/`2` boundary.
- Repeated increments must calculate from unit price rather than concatenate text values.
- The minimum is enforced in both control state and update logic.

## Out of scope

- Removing products from the cart
- Inventory limits and stock reservation
- Taxes, discounts, and paid shipping
- Checkout, payment, and order creation
- Cross-browser coverage beyond Chromium
