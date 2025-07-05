// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartCount();
    }

    // Load cart from localStorage
    loadCart() {
        const savedCart = localStorage.getItem('fashionForwardCart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('fashionForwardCart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    // Add item to cart
    addItem(product, selectedSize = '', selectedColor = '', quantity = 1) {
        const existingItemIndex = this.items.findIndex(item => 
            item.id === product.id && 
            item.selectedSize === selectedSize && 
            item.selectedColor === selectedColor
        );

        if (existingItemIndex > -1) {
            this.items[existingItemIndex].quantity += quantity;
        } else {
            this.items.push({
                ...product,
                selectedSize,
                selectedColor,
                quantity
            });
        }

        this.saveCart();
        this.showNotification('Product added to cart!');
    }

    // Remove item from cart
    removeItem(productId, selectedSize = '', selectedColor = '') {
        this.items = this.items.filter(item => 
            !(item.id === productId && 
              item.selectedSize === selectedSize && 
              item.selectedColor === selectedColor)
        );
        this.saveCart();
    }

    // Update item quantity
    updateQuantity(productId, selectedSize, selectedColor, newQuantity) {
        const itemIndex = this.items.findIndex(item => 
            item.id === productId && 
            item.selectedSize === selectedSize && 
            item.selectedColor === selectedColor
        );

        if (itemIndex > -1) {
            if (newQuantity <= 0) {
                this.removeItem(productId, selectedSize, selectedColor);
            } else {
                this.items[itemIndex].quantity = newQuantity;
                this.saveCart();
            }
        }
    }

    // Get cart total
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Get cart item count
    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    // Clear cart
    clear() {
        this.items = [];
        this.saveCart();
    }

    // Update cart count in header
    updateCartCount() {
        const cartCountElements = document.querySelectorAll('#cart-count');
        const count = this.getItemCount();
        cartCountElements.forEach(element => {
            if (element) {
                element.textContent = count;
            }
        });
    }

    // Show notification
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #2563eb;
            color: white;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 3000);
    }
}

// Create global cart instance
const cart = new ShoppingCart();