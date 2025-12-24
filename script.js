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
