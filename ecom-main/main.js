// Main JavaScript for homepage
document.addEventListener('DOMContentLoaded', function() {
    // Load featured products
    loadFeaturedProducts();
    
    // Mobile menu toggle
    setupMobileMenu();
});

function loadFeaturedProducts() {
    const featuredProductsGrid = document.getElementById('featured-products-grid');
    if (!featuredProductsGrid) return;

    const featuredProducts = getFeaturedProducts();
    
    featuredProductsGrid.innerHTML = featuredProducts.map(product => `
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