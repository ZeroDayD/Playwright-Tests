import './style.css';

const product = {
  name: 'Canvas Backpack',
  description: 'A durable everyday carry with a padded laptop sleeve.',
  unitPrice: 49,
};

let quantity = 1;

const app = document.querySelector<HTMLElement>('#app');

if (!app) {
  throw new Error('Application root was not found.');
}

app.innerHTML = `
  <header class="site-header">
    <a class="brand" href="/" aria-label="Northstar Supply home">Northstar Supply</a>
    <span class="eyebrow">Demo storefront</span>
  </header>

  <section class="cart" aria-labelledby="cart-heading">
    <div class="cart-heading-row">
      <div>
        <p class="eyebrow">Secure checkout</p>
        <h1 id="cart-heading">Your cart</h1>
      </div>
      <span class="item-count" data-testid="cart-item-count">1 item</span>
    </div>

    <article class="cart-item" aria-labelledby="product-name">
      <div class="product-art" aria-hidden="true">
        <span>NS</span>
      </div>

      <div class="product-details">
        <h2 id="product-name">${product.name}</h2>
        <p>${product.description}</p>
        <span class="stock">In stock</span>
      </div>

      <div class="quantity-group">
        <label for="quantity">Quantity</label>
        <div class="quantity-control">
          <button type="button" data-action="decrease" aria-label="Decrease ${product.name} quantity">−</button>
          <input id="quantity" type="number" min="1" value="1" readonly />
          <button type="button" data-action="increase" aria-label="Increase ${product.name} quantity">+</button>
        </div>
      </div>

      <div class="line-price">
        <span>Item total</span>
        <strong data-testid="line-total">$49.00</strong>
      </div>
    </article>

    <aside class="summary" aria-labelledby="summary-heading">
      <h2 id="summary-heading">Order summary</h2>
      <div><span>Subtotal</span><span data-testid="subtotal">$49.00</span></div>
      <div><span>Shipping</span><span>Free</span></div>
      <div class="summary-total"><span>Total</span><strong data-testid="cart-total">$49.00</strong></div>
      <button class="checkout" type="button">Continue to checkout</button>
      <p>Checkout is intentionally outside this demo's test scope.</p>
    </aside>
  </section>
`;

const quantityInput = document.querySelector<HTMLInputElement>('#quantity');
const decreaseButton = document.querySelector<HTMLButtonElement>('[data-action="decrease"]');
const increaseButton = document.querySelector<HTMLButtonElement>('[data-action="increase"]');
const lineTotal = document.querySelector<HTMLElement>('[data-testid="line-total"]');
const subtotal = document.querySelector<HTMLElement>('[data-testid="subtotal"]');
const cartTotal = document.querySelector<HTMLElement>('[data-testid="cart-total"]');
const itemCount = document.querySelector<HTMLElement>('[data-testid="cart-item-count"]');

if (
  !quantityInput ||
  !decreaseButton ||
  !increaseButton ||
  !lineTotal ||
  !subtotal ||
  !cartTotal ||
  !itemCount
) {
  throw new Error('Cart controls were not rendered.');
}

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);

const renderCart = (): void => {
  const total = formatCurrency(product.unitPrice * quantity);

  quantityInput.value = String(quantity);
  decreaseButton.disabled = quantity === 1;
  lineTotal.textContent = total;
  subtotal.textContent = total;
  cartTotal.textContent = total;
  itemCount.textContent = `${quantity} ${quantity === 1 ? 'item' : 'items'}`;
};

decreaseButton.addEventListener('click', () => {
  quantity = Math.max(1, quantity - 1);
  renderCart();
});

increaseButton.addEventListener('click', () => {
  quantity += 1;
  renderCart();
});

renderCart();
