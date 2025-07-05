// JavaScript for products page
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupCategoryFilter();
    setupMobileMenu();
});

let currentCategory = 'all';

function loadProducts(category = 'all') {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    const filteredProducts = getProductsByCategory(category);
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="goToProduct(${product.id})">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <div class="product-pricing">
                    <span class="product-price">₹${product.price}</span>
                    ${product.originalPrice ? `<span class="product-original-price">₹${product.originalPrice}</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function setupCategoryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get category and load products
            const category = this.getAttribute('data-category');
            currentCategory = category;
            loadProducts(category);
        });
    });
}

function goToProduct(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
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