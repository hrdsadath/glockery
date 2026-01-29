import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useCart } from '../contexts/CartContext';
import canisterImg from '../img/canister.jpeg';
import kettleImg from '../img/borddil kettle.jpeg';
import cutleryImg from '../img/cuttlery set gold.jpeg';
import nutsImg from '../img/nuts try.jpeg';
import jugImg from '../img/primium jug set.jpeg';
import cupImg from '../img/wooden cup and sucer.jpeg';

const HomePage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const cartContext = useCart();
    const cartCount = cartContext?.state.items.length || 0;

    // Banner slideshow images
    const bannerImages = [
        {
            id: 1,
            src: canisterImg,
            alt: 'Canister'
        },
        {
            id: 2,
            src: kettleImg,
            alt: 'Borddil Kettle'
        },
        {
            id: 3,
            src: cutleryImg,
            alt: 'Cutlery Set Gold'
        },
        {
            id: 4,
            src: nutsImg,
            alt: 'Nuts Tray'
        },
        {
            id: 5,
            src: jugImg,
            alt: 'Premium Jug Set'
        },
        {
            id: 6,
            src: cupImg,
            alt: 'Wooden Cup and Saucer'
        }
    ];

    // Auto-slide every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [bannerImages.length]);

    // Detect small screens to apply banner background image
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    // Sample products data
    const products = [
        {
            id: '1',
            name: 'Ceramic Bowl',
            description: 'Beautiful handcrafted ceramic bowl perfect for serving',
            price: 24.99,
            imageUrl: nutsImg
                },
        {
            id: '2',
            name: 'Dinner Plate Set',
            description: 'Set of 4 elegant dinner plates',
            price: 49.99,
            imageUrl: 'https://via.placeholder.com/280x250?text=Dinner+Plate'
        },
        {
            id: '3',
            name: 'Tea Cup',
            description: 'Delicate porcelain tea cup with handle',
            price: 12.99,
            imageUrl: cupImg
        },
        {
            id: '4',
            name: 'Serving Platter',
            description: 'Large serving platter for special occasions',
            price: 59.99,
            imageUrl: 'https://via.placeholder.com/280x250?text=Serving+Platter'
        },
        {
            id: '5',
            name: 'Soup Bowl',
            description: 'Deep soup bowl with beautiful glaze',
            price: 15.99,
            imageUrl: 'https://via.placeholder.com/280x250?text=Soup+Bowl'
        },
        {
            id: '6',
            name: 'Coffee Mug Set',
            description: 'Set of 2 cozy coffee mugs',
            price: 22.99,
            imageUrl: jugImg
        }
    ];

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div>
            <header className="header">
                <div className="header-content">
                    <div className="header-logo">🍽️ CrockeryShop</div>
                    <form className="search-bar" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit">Search</button>
                    </form>
                    <nav className="header-nav">
                        <a href="#home">Home</a>
                        <a href="#products">Products</a>
                        <Link to="/cart" className="cart-link">
                            🛒 Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </Link>
                        <a href="#contact">Contact</a>
                    </nav>
                </div>
            </header>

            <section
                className="banner"
                style={isMobile ? { backgroundImage: `linear-gradient(rgba(30,64,175,0.6), rgba(37,99,235,0.6)), url(${bannerImages[currentSlide].src})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
            >
                <div className="banner-content">
                    <h2>Premium Quality Crockery</h2>
                    <p>Discover our exclusive collection of handcrafted ceramic and porcelain pieces</p>
                    <button className="banner-btn">Shop Now</button>
                </div>
                {!isMobile && (
                    <div className="banner-slideshow">
                        <div className="slideshow-container">
                            {bannerImages.map((image, index) => (
                                <div
                                    key={image.id}
                                    className={`slide ${index === currentSlide ? 'active' : ''}`}
                                >
                                    <img src={image.src} alt={image.alt} />
                                </div>
                            ))}
                            <button className="slide-btn prev" onClick={prevSlide}>❮</button>
                            <button className="slide-btn next" onClick={nextSlide}>❯</button>
                        </div>
                        <div className="slide-dots">
                            {bannerImages.map((_, index) => (
                                <button
                                    key={index}
                                    className={`dot ${index === currentSlide ? 'active' : ''}`}
                                    onClick={() => goToSlide(index)}
                                ></button>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            <section className="products-section">
                <h2>Our Premium Crockery Collection</h2>
                <div className="products-grid">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;