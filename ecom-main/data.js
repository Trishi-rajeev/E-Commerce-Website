// Product data with realistic clothing items
const products = [
    {
        id: 1,
        name: "Classic White T-Shirt",
        price: 29.99,
        originalPrice: 39.99,
        category: "T-Shirts",
        description: "A timeless classic white t-shirt made from 100% organic cotton. Perfect for everyday wear with a comfortable fit and breathable fabric. This versatile piece can be dressed up or down for any occasion.",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: ["White", "Black", "Gray"]
    },
    {
        id: 2,
        name: "Slim Fit Jeans",
        price: 79.99,
        originalPrice: 99.99,
        category: "Jeans",
        description: "Premium denim jeans with a modern slim fit. Crafted from high-quality stretch denim for comfort and style. Features classic five-pocket styling and a versatile dark wash.",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
        sizes: ["28", "30", "32", "34", "36", "38"],
        colors: ["Dark Blue", "Light Blue", "Black"]
    },
    {
        id: 3,
        name: "Summer Floral Dress",
        price: 89.99,
        category: "Dresses",
        description: "Beautiful floral print dress perfect for summer occasions. Features a flattering A-line silhouette and comfortable midi length. Made from lightweight, breathable fabric.",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Floral Blue", "Floral Pink", "Floral Yellow"]
    },
    {
        id: 4,
        name: "Leather Jacket",
        price: 199.99,
        originalPrice: 249.99,
        category: "Jackets",
        description: "Genuine leather jacket with a classic biker style. Features multiple pockets, a comfortable lining, and durable construction. Perfect for adding edge to any outfit.",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "Brown"]
    },
    {
        id: 5,
        name: "Running Sneakers",
        price: 129.99,
        category: "Shoes",
        description: "High-performance running sneakers with advanced cushioning technology. Perfect for workouts and casual wear. Features breathable mesh upper and durable rubber sole.",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
        sizes: ["7", "8", "9", "10", "11", "12"],
        colors: ["White", "Black", "Blue", "Red"]
    },
    {
        id: 6,
        name: "Casual Button-Up Shirt",
        price: 59.99,
        category: "T-Shirts",
        description: "Versatile button-up shirt suitable for both casual and semi-formal occasions. Made from breathable cotton blend with a comfortable regular fit.",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["White", "Blue", "Light Gray"]
    },
    {
        id: 7,
        name: "High-Waisted Jeans",
        price: 89.99,
        category: "Jeans",
        description: "Trendy high-waisted jeans with a flattering fit. Features a vintage-inspired design with modern comfort. Perfect for creating a stylish silhouette.",
        image: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=400&h=400&fit=crop",
        sizes: ["24", "26", "28", "30", "32"],
        colors: ["Dark Blue", "Light Blue", "Black"]
    },
    {
        id: 8,
        name: "Cocktail Dress",
        price: 149.99,
        category: "Dresses",
        description: "Elegant cocktail dress perfect for special occasions. Features a sophisticated design with premium fabric and flattering cut. Ideal for evening events.",
        image: "https://images.unsplash.com/photo-1652501060301-a271a3492d95?w=400&h=400&fit=crop",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Black", "Navy", "Burgundy"]
    },
    {
        id: 9,
        name: "Denim Jacket",
        price: 79.99,
        category: "Jackets",
        description: "Classic denim jacket with a timeless design. Perfect for layering and adding a casual touch to any outfit. Features traditional styling with modern updates.",
        image: "https://images.unsplash.com/photo-1615943168243-5b2503679e47?w=400&h=400&fit=crop",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Light Blue", "Dark Blue", "Black"]
    },
    {
        id: 10,
        name: "Canvas Sneakers",
        price: 69.99,
        category: "Shoes",
        description: "Comfortable canvas sneakers with a retro design. Perfect for casual everyday wear. Features durable construction and classic styling.",
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop",
        sizes: ["6", "7", "8", "9", "10", "11"],
        colors: ["White", "Black", "Red", "Navy"]
    },
    {
        id: 11,
        name: "Graphic T-Shirt",
        price: 34.99,
        category: "T-Shirts",
        description: "Trendy graphic t-shirt with unique artwork. Made from soft cotton for all-day comfort. Perfect for expressing your personal style.",
        image: "https://plus.unsplash.com/premium_photo-1692650759832-4d674420e5e7?w=400&h=400&fit=crop",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Black", "White", "Gray"]
    },
    {
        id: 12,
        name: "Maxi Dress",
        price: 119.99,
        category: "Dresses",
        description: "Flowing maxi dress perfect for summer events. Features a comfortable fit and elegant design. Made from lightweight fabric that moves beautifully.",
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Navy", "Black", "Floral Print"]
    }
];

// Function to get product by ID
function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

// Function to get products by category
function getProductsByCategory(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Function to get featured products (first 4 products)
function getFeaturedProducts() {
    return products.slice(0, 4);
}