// Product Database
const products = {
    'cutting-board': {
        id: 'cutting-board',
        name: 'Custom Cutting Board',
        category: 'woodworking',
        price: 45.00,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop',
        shortDescription: 'Beautiful handcrafted cutting board made from premium hardwood',
        fullDescription: 'This beautiful cutting board is handcrafted from premium hardwood with a food-safe finish. Each board is unique with its own grain pattern. Perfect for meal prep or as a stunning serving board for charcuterie and appetizers.',
        features: [
            'Premium hardwood construction',
            'Food-safe mineral oil finish',
            'Hand-sanded smooth surface',
            'Reversible design',
            'Easy to clean and maintain'
        ],
        dimensions: '16" x 12" x 1.25"',
        materials: 'Walnut, Maple, Cherry',
        stripeLink: ''
    },
    'floating-shelf': {
        id: 'floating-shelf',
        name: 'Floating Wall Shelf',
        category: 'woodworking',
        price: 65.00,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop',
        shortDescription: 'Rustic wooden shelf perfect for displaying your favorite items',
        fullDescription: 'Add character to any room with this handcrafted floating shelf. Made from solid wood with a rustic finish, it provides both style and function. Hidden mounting hardware creates a clean, floating appearance.',
        features: [
            'Solid wood construction',
            'Rustic distressed finish',
            'Hidden mounting hardware included',
            'Weight capacity: 25 lbs',
            'Easy wall installation'
        ],
        dimensions: '24" x 8" x 2"',
        materials: 'Pine, Stain finish',
        stripeLink: ''
    },
    'desk-organizer': {
        id: 'desk-organizer',
        name: 'Wooden Desk Organizer',
        category: 'woodworking',
        price: 35.00,
        image: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800&h=800&fit=crop',
        shortDescription: 'Keep your workspace tidy with this elegant wooden organizer',
        fullDescription: 'Keep your desk neat and organized with this handcrafted wooden organizer. Features multiple compartments for pens, pencils, business cards, and small accessories. The natural wood finish adds warmth to any workspace.',
        features: [
            'Multiple storage compartments',
            'Smooth sanded finish',
            'Natural wood grain',
            'Non-slip rubber feet',
            'Compact footprint'
        ],
        dimensions: '10" x 6" x 4"',
        materials: 'Oak, Natural finish',
        stripeLink: ''
    },
    'phone-stand': {
        id: 'phone-stand',
        name: 'Adjustable Phone Stand',
        category: '3d-prints',
        price: 15.00,
        image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=800&fit=crop',
        shortDescription: 'Custom color options available - perfect for any desk setup',
        fullDescription: '3D printed phone stand with adjustable viewing angles. Designed to hold your phone securely while charging or video calling. Available in a variety of colors to match your style.',
        features: [
            'Adjustable viewing angle',
            'Non-slip base and grip',
            'Cable management slot',
            'Fits most phone cases',
            'Custom color options'
        ],
        dimensions: '4" x 3" x 2.5"',
        materials: 'PLA filament',
        stripeLink: ''
    },
    'cable-clips': {
        id: 'cable-clips',
        name: 'Cable Management Clips',
        category: '3d-prints',
        price: 12.00,
        image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=800&h=800&fit=crop',
        shortDescription: 'Set of 10 clips - keep your cables organized and tangle-free',
        fullDescription: 'Say goodbye to cable chaos! This set of 10 cable management clips keeps your cords organized and within reach. Adhesive backing sticks to any surface - desks, walls, or car dashboards.',
        features: [
            'Set of 10 clips',
            'Strong adhesive backing',
            'Multiple size options',
            'Durable PLA construction',
            'Easy to install'
        ],
        dimensions: 'Various sizes in set',
        materials: 'PLA filament',
        stripeLink: ''
    },
    'custom-print': {
        id: 'custom-print',
        name: 'Custom 3D Print',
        category: '3d-prints',
        price: 20.00,
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&h=800&fit=crop',
        shortDescription: 'Have an idea? We can bring it to life with 3D printing!',
        fullDescription: 'Have a unique idea or design in mind? We can bring it to life with custom 3D printing! Whether you need a replacement part, custom gift, prototype, or decorative piece, we can create it. Send us your design or describe your idea for a quote.',
        features: [
            'Custom designs welcome',
            'Multiple material options',
            'Various color choices',
            'Prototyping available',
            'Free design consultation'
        ],
        dimensions: 'Custom sizing available',
        materials: 'PLA, PETG, TPU available',
        stripeLink: ''
    }
};

// Get product by ID
function getProduct(productId) {
    return products[productId];
}

// Get all products by category
function getProductsByCategory(category) {
    return Object.values(products).filter(p => p.category === category);
}

// Get all products
function getAllProducts() {
    return Object.values(products);
}
