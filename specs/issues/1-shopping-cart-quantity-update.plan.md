# Issue #1 — Shopping cart quantity update

## Application Overview

**Source Issue:** [#1 — [QA coverage]: Shopping cart quantity update](https://github.com/ZeroDayD/Playwright-Tests/issues/1)  
**Feature:** Shopping cart quantity update

## Requirement summary

Add regression coverage for increasing the cart quantity multiple times. Preserve the Issue acceptance criteria exactly:
1. A user can increase Canvas Backpack quantity from 1 to 3.
2. Item total, subtotal, and cart total become $147.00.
3. Cart item count becomes "3 items".

## Test configuration

- Application: local demo application
- Route: `/`
- Scope: Web UI / Chromium
- Seed: `tests/seed.spec.ts`
- Product: Canvas Backpack (unit price $49.00, as displayed in the demo)

## Assumptions

- Each scenario is run independently from a fresh browser context and fresh cart state with quantity `1`, using the supplied seed.
- The user updates quantity through the accessible **Increase Canvas Backpack quantity** button; the quantity input is display-only in the observed UI.
- The Issue specifies the target quantity and totals but no upper quantity limit, persistence behavior, or error message contract; do not infer one.

## Edge cases

- Check the intermediate state after the first increment (quantity `2`, plural count `2 items`) before performing the second increment, so the regression verifies repeated updates rather than a single jump.
- Check the second increment crosses to the exact target quantity `3`, cart count `3 items`, and each requested $147.00 amount.
- Keep monetary checks separate for item total, subtotal, and cart total so a stale or partially updated amount is detected.
- No editable user input or validation/error state is part of this flow; do not invent invalid-input expectations.

## Out of scope

- Checkout, payment, and purchase submission.
- Browsers other than Chromium.
- Unspecified maximum quantities, inventory behavior, cart persistence, taxes, discounts, or other cart features.

## Test Scenarios

### 1. Shopping cart quantity update

**Seed:** `tests/seed.spec.ts`

#### 1.1. Increase Canvas Backpack quantity from one to three across successive updates

**File:** `tests/issues/1-shopping-cart-quantity-update.spec.ts`

**Steps:**
  1. Open the local demo cart at `/` from the fresh seeded state.
    - expect: The cart is loaded and shows Canvas Backpack at quantity 1.
    - expect: The initial quantity and cart state match the fresh seed state; no state from another test is reused.
  2. Activate **Increase Canvas Backpack quantity** once.
    - expect: Quantity becomes 2.
    - expect: Cart item count becomes `2 items`, showing the first quantity boundary was recalculated.
  3. Activate **Increase Canvas Backpack quantity** a second time.
    - expect: Quantity becomes 3.
    - expect: Item total is `$147.00`.
    - expect: Subtotal is `$147.00`.
    - expect: Cart total is `$147.00`.
    - expect: Cart item count is exactly `3 items`.
