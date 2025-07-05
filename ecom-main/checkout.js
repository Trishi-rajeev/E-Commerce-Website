// JavaScript for checkout page
document.addEventListener('DOMContentLoaded', function() {
    loadCheckoutPage();
    setupCheckoutForm();
    setupMobileMenu();
});

function loadCheckoutPage() {
    if (cart.items.length === 0) {
        document.querySelector('.checkout-content').innerHTML = `
            <div class="empty-cart">
                <h2>No items in cart</h2>
                <p style="margin-bottom: 1rem;">Add some items to your cart before checking out.</p>
                <a href="products.html" class="btn btn-primary">Shop Now</a>
            </div>
        `;
        return;
    }
    
    loadOrderSummary();
}

function loadOrderSummary() {
    const orderItems = document.getElementById('order-items');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    
    const subtotal = cart.getTotal();
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;
    
    orderItems.innerHTML = cart.items.map(item => `
        <div class="order-item">
            <div class="order-item-info">
                <div class="order-item-name">${item.name}</div>
                <div class="order-item-details">
                    Qty: ${item.quantity}
                    ${item.selectedSize ? ` • Size: ${item.selectedSize}` : ''}
                    ${item.selectedColor ? ` • Color: ${item.selectedColor}` : ''}
                </div>
            </div>
            <div class="order-item-price">₹${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');
    
    subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
    taxElement.textContent = `₹${tax.toFixed(2)}`;
    totalElement.textContent = `₹${total.toFixed(2)}`;
}

function setupCheckoutForm() {
    const checkoutForm = document.getElementById('checkout-form');
    
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate order processing
        const formData = new FormData(checkoutForm);
        const orderData = Object.fromEntries(formData);
        
        // Validate form (basic validation)
        if (!validateCheckoutForm(orderData)) {
            return;
        }
        
        // Simulate successful order
        processOrder(orderData);
    });
}

function validateCheckoutForm(data) {
    const requiredFields = ['email', 'firstName', 'lastName', 'address', 'city', 'state', 'zipCode', 'cardNumber', 'expiryDate', 'cvv'];
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
            return false;
        }
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    // Basic card number validation (just check if it's numbers and proper length)
    const cardNumber = data.cardNumber.replace(/\s/g, '');
    if (!/^\d{13,19}$/.test(cardNumber)) {
        alert('Please enter a valid card number.');
        return false;
    }
    
    // Basic expiry date validation (MM/YY format)
    if (!/^\d{2}\/\d{2}$/.test(data.expiryDate)) {
        alert('Please enter expiry date in MM/YY format.');
        return false;
    }
    
    // Basic CVV validation
    if (!/^\d{3,4}$/.test(data.cvv)) {
        alert('Please enter a valid CVV.');
        return false;
    }
    
    return true;
}

function processOrder(orderData) {
    // Show loading state
    const submitButton = document.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Processing...';
    submitButton.disabled = true;
    
    // Simulate processing delay
    setTimeout(() => {
        // Create order summary
        const orderSummary = {
            orderNumber: generateOrderNumber(),
            items: cart.items,
            total: cart.getTotal() * 1.08, // Including tax
            customerInfo: orderData,
            orderDate: new Date().toLocaleDateString()
        };
        
        // Clear cart
        cart.clear();
        
        // Show success message
        showOrderSuccess(orderSummary);
        
    }, 2000);
}

function generateOrderNumber() {
    return 'FF' + Date.now().toString().slice(-8);
}

function showOrderSuccess(orderSummary) {
    document.querySelector('.checkout-content').innerHTML = `
        <div class="order-success">
            <div style="text-align: center; padding: 3rem;">
                <h1 style="color: #059669; margin-bottom: 1rem;">Order Placed Successfully!</h1>
                <p style="font-size: 1.2rem; margin-bottom: 2rem;">Thank you for your purchase!</p>
                
                <div style="background: white; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 2rem; text-align: left;">
                    <h3 style="margin-bottom: 1rem;">Order Details</h3>
                    <p><strong>Order Number:</strong> ${orderSummary.orderNumber}</p>
                    <p><strong>Order Date:</strong> ${orderSummary.orderDate}</p>
                    <p><strong>Total:</strong> ₹${orderSummary.total.toFixed(2)}</p>
                    <p><strong>Email:</strong> ${orderSummary.customerInfo.email}</p>
                </div>
                
                <p style="margin-bottom: 2rem;">A confirmation email has been sent to ${orderSummary.customerInfo.email}</p>
                
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <a href="index.html" class="btn btn-primary">Continue Shopping</a>
                    <a href="products.html" class="btn btn-secondary">View Products</a>
                </div>
            </div>
        </div>
    `;
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