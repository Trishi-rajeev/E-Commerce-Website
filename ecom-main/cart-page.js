// JavaScript for cart page
document.addEventListener('DOMContentLoaded', function() {
    loadCartPage();
    setupMobileMenu();
});

function loadCartPage() {
    const cartContent = document.getElementById('cart-content');
    
    if (cart.items.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>
                <p>Add some items to your cart to get started.</p>
                <a href="products.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        return;
    }
    
    cartContent.innerHTML = `
        <div class="cart-items">
            ${cart.items.map(item => renderCartItem(item)).join('')}
        </div>
        
        <div class="cart-summary">
            <div class="cart-total">
                Total: ₹${cart.getTotal().toFixed(2)}
            </div>
            <div class="cart-actions">
                <a href="products.html" class="btn btn-secondary">Continue Shopping</a>
                <a href="checkout.html" class="btn btn-primary">Proceed to Checkout</a>
            </div>
        </div>
    `;
}

function renderCartItem(item) {
    return `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <h3 class="cart-item-name">${item.name}</h3>
                <div class="cart-item-details">
                    ${item.selectedSize ? `Size: ${item.selectedSize}` : ''}
                    ${item.selectedSize && item.selectedColor ? ' • ' : ''}
                    ${item.selectedColor ? `Color: ${item.selectedColor}` : ''}
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-selector">
                        <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, '${item.selectedSize}', '${item.selectedColor}', ${item.quantity - 1})">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, '${item.selectedSize}', '${item.selectedColor}', ${item.quantity + 1})">+</button>
                    </div>
                    <span class="cart-item-price">₹${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-btn" onclick="removeFromCart(${item.id}, '${item.selectedSize}', '${item.selectedColor}')">Remove</button>
                </div>
            </div>
        </div>
    `;
}

function updateCartQuantity(productId, selectedSize, selectedColor, newQuantity) {
    cart.updateQuantity(productId, selectedSize, selectedColor, newQuantity);
    loadCartPage();
}

function removeFromCart(productId, selectedSize, selectedColor) {
    cart.removeItem(productId, selectedSize, selectedColor);
    loadCartPage();
}

function setupMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuToggle && navList) {
        mobileMenuToggle.addEventListener('click', function() {
            navList.classList.toggle('mobile-active');
        });
    }
}