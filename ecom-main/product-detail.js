// JavaScript for product detail page
document.addEventListener('DOMContentLoaded', function() {
    loadProductDetail();
    setupMobileMenu();
});

let currentProduct = null;
let selectedSize = '';
let selectedColor = '';
let quantity = 1;

function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        showProductNotFound();
        return;
    }
    
    currentProduct = getProductById(parseInt(productId));
    
    if (!currentProduct) {
        showProductNotFound();
        return;
    }
    
    renderProductDetail();
}

function showProductNotFound() {
    const content = document.getElementById('product-detail-content');
    content.innerHTML = `
        <div class="text-center">
            <h1>Product Not Found</h1>
            <p>The product you're looking for doesn't exist.</p>
            <a href="products.html" class="btn btn-primary">Back to Products</a>
        </div>
    `;
}

function renderProductDetail() {
    const content = document.getElementById('product-detail-content');
    
    content.innerHTML = `
        <div class="product-detail-grid">
            <div class="product-detail-image-container">
                <img src="${currentProduct.image}" alt="${currentProduct.name}" class="product-detail-image">
            </div>
            
            <div class="product-detail-info">
                <h1>${currentProduct.name}</h1>
                <p class="product-detail-category">${currentProduct.category}</p>
                
                <div class="product-detail-pricing">
                    <span class="product-detail-price">₹${currentProduct.price}</span>
                    ${currentProduct.originalPrice ? `<span class="product-original-price">₹${currentProduct.originalPrice}</span>` : ''}
                </div>
                
                <p class="product-detail-description">${currentProduct.description}</p>
                
                ${currentProduct.sizes ? renderSizeOptions() : ''}
                ${currentProduct.colors ? renderColorOptions() : ''}
                
                <div class="product-options">
                    <h3>Quantity</h3>
                    <div class="quantity-selector">
                        <button class="quantity-btn" onclick="updateQuantity(-1)">-</button>
                        <span class="quantity-display" id="quantity-display">${quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(1)">+</button>
                    </div>
                </div>
                
                <button class="btn btn-primary btn-full" onclick="addToCart()">Add to Cart</button>
            </div>
        </div>
    `;
    
    // Set default selections
    if (currentProduct.sizes && currentProduct.sizes.length > 0) {
        selectedSize = currentProduct.sizes[0];
        document.querySelector(`[data-size="${selectedSize}"]`).classList.add('selected');
    }
    
    if (currentProduct.colors && currentProduct.colors.length > 0) {
        selectedColor = currentProduct.colors[0];
        document.querySelector(`[data-color="${selectedColor}"]`).classList.add('selected');
    }
}

function renderSizeOptions() {
    return `
        <div class="product-options">
            <h3>Size</h3>
            <div class="option-buttons">
                ${currentProduct.sizes.map(size => `
                    <button class="option-btn" data-size="${size}" onclick="selectSize('${size}')">${size}</button>
                `).join('')}
            </div>
        </div>
    `;
}

function renderColorOptions() {
    return `
        <div class="product-options">
            <h3>Color</h3>
            <div class="option-buttons">
                ${currentProduct.colors.map(color => `
                    <button class="option-btn" data-color="${color}" onclick="selectColor('${color}')">${color}</button>
                `).join('')}
            </div>
        </div>
    `;
}

function selectSize(size) {
    selectedSize = size;
    
    // Update UI
    document.querySelectorAll('[data-size]').forEach(btn => btn.classList.remove('selected'));
    document.querySelector(`[data-size="${size}"]`).classList.add('selected');
}

function selectColor(color) {
    selectedColor = color;
    
    // Update UI
    document.querySelectorAll('[data-color]').forEach(btn => btn.classList.remove('selected'));
    document.querySelector(`[data-color="${color}"]`).classList.add('selected');
}

function updateQuantity(change) {
    quantity = Math.max(1, quantity + change);
    document.getElementById('quantity-display').textContent = quantity;
}

function addToCart() {
    if (currentProduct.sizes && !selectedSize) {
        alert('Please select a size');
        return;
    }
    
    if (currentProduct.colors && !selectedColor) {
        alert('Please select a color');
        return;
    }
    
    cart.addItem(currentProduct, selectedSize, selectedColor, quantity);
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