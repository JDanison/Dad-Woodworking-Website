// Product filtering functionality
let currentFilter = 'all';

function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    const title = document.getElementById('products-title');
    const clearButton = document.getElementById('clear-filter');
    
    currentFilter = category;
    
    products.forEach(product => {
        if (category === 'all') {
            product.style.display = '';
        } else {
            if (product.dataset.category === category) {
                product.style.display = '';
            } else {
                product.style.display = 'none';
            }
        }
    });
    
    // Update title and show/hide clear button
    if (category === 'all') {
        title.textContent = 'All Products';
        if (clearButton) clearButton.style.display = 'none';
    } else if (category === 'woodworking') {
        title.textContent = 'Woodworking Products';
        if (clearButton) clearButton.style.display = 'block';
    } else if (category === '3d-prints') {
        title.textContent = '3D Print Products';
        if (clearButton) clearButton.style.display = 'block';
    }
    
    // Sort products alphabetically
    sortProductsAlphabetically();
}

function sortProductsAlphabetically() {
    const grid = document.querySelector('.products-grid');
    if (!grid) return;
    
    const products = Array.from(document.querySelectorAll('.product-card'));
    
    // Filter visible products
    const visibleProducts = products.filter(p => p.style.display !== 'none');
    
    // Sort by product title
    visibleProducts.sort((a, b) => {
        const titleA = a.querySelector('.product-title').textContent;
        const titleB = b.querySelector('.product-title').textContent;
        return titleA.localeCompare(titleB);
    });
    
    // Re-append in sorted order
    visibleProducts.forEach(product => {
        grid.appendChild(product);
    });
}

// Check URL parameters and apply filter on page load
function checkURLFilter() {
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    
    if (filterParam && (filterParam === 'woodworking' || filterParam === '3d-prints')) {
        filterProducts(filterParam);
        // Scroll to products section
        setTimeout(() => {
            const productsSection = document.getElementById('products');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    } else {
        sortProductsAlphabetically();
    }
}

// Set up category card click handlers and URL filter check
document.addEventListener('DOMContentLoaded', () => {
    // Check for URL filter parameter
    checkURLFilter();
    
    // Category card filters (for shop page)
    const categoryCards = document.querySelectorAll('.category-card[data-filter]');
    categoryCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = card.dataset.filter;
            filterProducts(filter);
            
            // Update URL without reload
            const url = new URL(window.location);
            url.searchParams.set('filter', filter);
            window.history.pushState({}, '', url);
            
            // Scroll to products section
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Clear filter button
    const clearButton = document.getElementById('clear-filter');
    if (clearButton) {
        clearButton.addEventListener('click', () => {
            filterProducts('all');
            
            // Clear URL parameter
            const url = new URL(window.location);
            url.searchParams.delete('filter');
            window.history.pushState({}, '', url);
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all product cards on page load
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.product-card, .category-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// Handle buy button clicks - integrate with Stripe Payment Links
document.querySelectorAll('.btn-cart').forEach(button => {
    button.addEventListener('click', function() {
        const stripeLink = this.getAttribute('data-stripe-link');
        const productName = this.getAttribute('data-product');
        
        if (stripeLink && stripeLink !== '') {
            // Redirect to Stripe Payment Link
            window.location.href = stripeLink;
        } else {
            // Show message if no Stripe link is set up yet
            alert(`${productName} purchase coming soon! \n\nTo enable purchases:\n1. Create a product in your Stripe dashboard\n2. Generate a Payment Link\n3. Add it to the data-stripe-link attribute on this button`);
        }
    });
});

// Auto-scroll from hero to categories section on first scroll
let hasScrolledFromHero = false;
let isAutoScrolling = false;

window.addEventListener('wheel', (e) => {
    const hero = document.querySelector('.hero');
    const categories = document.querySelector('.categories-section');
    const heroRect = hero.getBoundingClientRect();
    
    // Reset flag when we're back at the top
    if (window.scrollY === 0) {
        hasScrolledFromHero = false;
    }
    
    // Check if we're on the hero section and scrolling down
    if (!hasScrolledFromHero && !isAutoScrolling && heroRect.top === 0 && e.deltaY > 0) {
        e.preventDefault();
        isAutoScrolling = true;
        hasScrolledFromHero = true;
        
        categories.scrollIntoView({ behavior: 'smooth' });
        
        setTimeout(() => {
            isAutoScrolling = false;
        }, 1000);
    }
}, { passive: false });

// Add navbar background on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Optional: Add a simple loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

/*
 * STRIPE PAYMENT LINKS SETUP INSTRUCTIONS:
 * 
 * 1. Go to https://dashboard.stripe.com/products
 * 2. Click "Add product" for each item you want to sell
 * 3. Fill in product name, description, and price
 * 4. Click "Create product"
 * 5. On the product page, click "Create payment link"
 * 6. Copy the payment link URL
 * 7. In index.html, find the corresponding button and update the data-stripe-link attribute:
 *    
 *    Example:
 *    <button class="btn btn-cart" 
 *            data-product="Cutting Board" 
 *            data-price="45.00" 
 *            data-stripe-link="https://buy.stripe.com/xxxxxxxxxxxxx">
 *        <i class="fas fa-shopping-cart"></i>
 *        Buy Now
 *    </button>
 * 
 * 8. Repeat for all products
 * 9. Test by clicking a buy button - it should redirect to Stripe's checkout page
 */

// Product Modal Functionality
function openProductModal(productId) {
    const product = getProduct(productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    
    // Populate modal content
    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalImage').alt = product.name;
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalPrice').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('modalDescription').textContent = product.fullDescription;
    document.getElementById('modalDimensions').textContent = product.dimensions;
    document.getElementById('modalMaterials').textContent = product.materials;
    
    // Populate features list
    const featuresList = document.getElementById('modalFeatures');
    featuresList.innerHTML = '';
    product.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    // Set up Buy Now button
    const buyButton = document.getElementById('modalBuyButton');
    buyButton.onclick = () => {
        if (product.stripeLink && product.stripeLink !== '') {
            window.location.href = product.stripeLink;
        } else {
            alert('Payment link not configured yet. Please contact us directly to purchase this item.');
        }
    };
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('productModal');
    if (e.target === modal) {
        closeProductModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProductModal();
    }
});

// Make product cards clickable
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        // Make entire card clickable except for buttons
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            // Don't open modal if clicking the buy button
            if (e.target.closest('.btn-cart')) {
                return;
            }
            const productId = card.id;
            if (productId) {
                openProductModal(productId);
            }
        });
    });
});
