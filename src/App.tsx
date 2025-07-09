import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Sweeties from './pages/Sweeties';
import ProductDetail from './components/ProductDetail';
import CartModal, { CartItem } from './components/CartModal';
import SearchResults from './pages/SearchResults';
import { cakes, sweeties } from './data/products';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  // GitHub Pages routing fix
  useEffect(() => {
    // Handle GitHub Pages routing
    const link = window.location.search;
    if (link.includes('?/')) {
      const route = link.split('?/')[1];
      window.history.replaceState(null, '', `/${route}`);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target as Node)) {
        setIsMobileSearchOpen(false);
        setIsSearching(false);
        setSearchQuery('');
      }
    }

    function handleScroll() {
      if (isMobileSearchOpen) {
        setIsMobileSearchOpen(false);
        setIsSearching(false);
        setSearchQuery('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobileSearchOpen]);

  const allProducts = [
    ...cakes.map(cake => ({ ...cake, type: 'cake' })),
    ...sweeties.map(sweet => ({ ...sweet, type: 'sweet' }))
  ];

  const searchResults = searchQuery
    ? allProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems(prevItems => {
      if (quantity === 0) {
        return prevItems.filter(item => item.id !== id);
      }
      return prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
    });
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        const updatedItems = prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
        // Show success toast for existing item
        toast.success(`${item.name} quantity updated in cart!`, {
          duration: 3000,
          style: {
            background: '#10B981',
            color: '#ffffff',
            fontWeight: '500',
            borderRadius: '8px',
            padding: '12px 16px',
          },
          iconTheme: {
            primary: '#ffffff',
            secondary: '#10B981',
          },
        });
        return updatedItems;
      } else {
        // Show success toast for new item
        toast.success(`${item.name} added to cart!`, {
          duration: 3000,
          style: {
            background: '#10B981',
            color: '#ffffff',
            fontWeight: '500',
            borderRadius: '8px',
            padding: '12px 16px',
          },
          iconTheme: {
            primary: '#ffffff',
            secondary: '#10B981',
          },
        });
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const handleSearchFocus = () => {
    setIsSearching(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setIsSearching(false);
    }, 200);
  };

  const handleSearchItemClick = (type: string, id: number) => {
    setSearchQuery('');
    setIsSearching(false);
    setIsMobileSearchOpen(false);
    navigate(`/${type === 'cake' ? 'portfolio' : 'sweeties'}/${id}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(false);
      setIsMobileSearchOpen(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    if (!isMobileSearchOpen) {
      setTimeout(() => {
        const mobileSearchInput = document.getElementById('mobile-search');
        if (mobileSearchInput) {
          mobileSearchInput.focus();
        }
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Toast Notifications */}
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#10B981',
            color: '#ffffff',
            fontWeight: '500',
            borderRadius: '8px',
            padding: '12px 16px',
          },
        }}
      />

      <nav className="fixed w-full header-glass z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center logo-container p-2 rounded-full">
                <img 
                  src={`${import.meta.env.BASE_URL}assets/aesthetic-cakes-logo.png`}  
                  alt="Aesthetic Cakes Logo" 
                  className="h-12 w-12 transform hover:scale-105 transition-transform duration-300"
                />
                <span className="ml-3 text-2xl font-serif text-[#C71585] hover:text-[#FF69B4] transition-colors">
                  Aesthetic Cakes
                </span>
              </Link>
            </div>

            <div className="hidden md:flex flex-1 justify-center px-8 relative">
              <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search for cakes, cookies and more"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  className="w-full px-4 py-2 pl-10 rounded-full border border-[#FFB6C1] search-input focus:outline-none focus:border-[#C71585] focus:ring-2 focus:ring-[#C71585]/20"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C71585] h-5 w-5" />
                
                {isSearching && searchQuery && (
                  <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-[#FFB6C1] max-h-96 overflow-y-auto z-50">
                    {searchResults.length > 0 ? (
                      searchResults.map((product) => (
                        <div
                          key={`${product.type}-${product.id}`}
                          onClick={() => handleSearchItemClick(product.type, product.id)}
                          className="flex items-center p-3 hover:bg-[#FFF0F5] cursor-pointer border-b border-[#FFB6C1] last:border-b-0 transition-colors"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-[#C71585]">{product.name}</p>
                            <p className="text-sm text-[#DB7093]">{product.category}</p>
                          </div>
                          <span className="text-[#C71585] font-medium">{product.price}</span>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-[#C71585]">
                        No products found
                      </div>
                    )}
                  </div>
                )}
              </form>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="nav-link text-gray-600 hover:text-[#C71585] transition-colors">Home</Link>
              <a href="/#about" onClick={scrollToAbout} className="nav-link text-gray-600 hover:text-[#C71585] transition-colors">About</a>
              <Link to="/portfolio" className="nav-link text-gray-600 hover:text-[#C71585] transition-colors">Portfolio</Link>
              <Link to="/sweeties" className="nav-link text-gray-600 hover:text-[#C71585] transition-colors">Sweeties</Link>
              <a href="/#contact" onClick={scrollToContact} className="nav-link text-gray-600 hover:text-[#C71585] transition-colors">Contact</a>
              <div className="relative inline-block">
                <button 
                  onClick={handleCartClick}
                  className="nav-button p-2 rounded-full transition-all duration-300 hover:bg-[#FFF0F5]"
                  aria-label="Shopping Cart"
                >
                  <ShoppingCart className="h-6 w-6 text-[#C71585]" />
                </button>
                {cartItems.length > 0 && (
                  <div className="absolute -top-2 -right-2 flex items-center justify-center min-w-[22px] h-[22px] px-1.5 text-xs font-medium bg-[#C71585] text-white rounded-full shadow-sm">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </div>
                )}
              </div>
            </div>

            <div className="flex md:hidden items-center space-x-4">
              <button
                onClick={toggleMobileSearch}
                className="nav-button p-2 rounded-full transition-all duration-300 hover:bg-[#FFF0F5]"
                aria-label="Search"
              >
                <Search className="h-6 w-6 text-[#C71585]" />
              </button>
              <div className="relative inline-block">
                <button 
                  onClick={handleCartClick}
                  className="nav-button p-2 rounded-full transition-all duration-300 hover:bg-[#FFF0F5]"
                  aria-label="Shopping Cart"
                >
                  <ShoppingCart className="h-6 w-6 text-[#C71585]" />
                </button>
                {cartItems.length > 0 && (
                  <div className="absolute -top-2 -right-2 flex items-center justify-center min-w-[22px] h-[22px] px-1.5 text-xs font-medium bg-[#C71585] text-white rounded-full shadow-sm">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </div>
                )}
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="nav-button p-2 rounded-full transition-all duration-300 hover:bg-[#FFF0F5]"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-[#C71585]" />
                ) : (
                  <Menu className="h-6 w-6 text-[#C71585]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMobileSearchOpen && (
          <div ref={mobileSearchRef} className="md:hidden border-t border-gray-100 p-4 bg-white/95 backdrop-blur-sm">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                id="mobile-search"
                type="text"
                placeholder="Search for cakes, cookies and more"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                className="w-full px-4 py-2 pl-10 rounded-full border border-[#FFB6C1] search-input focus:outline-none focus:border-[#C71585] focus:ring-2 focus:ring-[#C71585]/20"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C71585] h-5 w-5" />
              
              {isSearching && searchQuery && (
                <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-[#FFB6C1] max-h-96 overflow-y-auto z-50">
                  {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <div
                        key={`${product.type}-${product.id}`}
                        onClick={() => handleSearchItemClick(product.type, product.id)}
                        className="flex items-center p-3 hover:bg-[#FFF0F5] cursor-pointer border-b border-[#FFB6C1] last:border-b-0 transition-colors"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-[#C71585]">{product.name}</p>
                          <p className="text-sm text-[#DB7093]">{product.category}</p>
                        </div>
                        <span className="text-[#C71585] font-medium">{product.price}</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-[#C71585]">
                      No products found
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
        )}

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-100">
            <div className="px-4 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[#C71585] hover:bg-[#FFF0F5] rounded-md transition-all duration-300"
                onClick={handleMobileNavClick}
              >
                Home
              </Link>
              <a
                href="/#about"
                onClick={scrollToAbout}
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[#C71585] hover:bg-[#FFF0F5] rounded-md transition-all duration-300"
              >
                About
              </a>
              <Link
                to="/portfolio"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[#C71585] hover:bg-[#FFF0F5] rounded-md transition-all duration-300"
                onClick={handleMobileNavClick}
              >
                Portfolio
              </Link>
              <Link
                to="/sweeties"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[#C71585] hover:bg-[#FFF0F5] rounded-md transition-all duration-300"
                onClick={handleMobileNavClick}
              >
                Sweeties
              </Link>
              <a
                href="/#contact"
                onClick={scrollToContact}
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[#C71585] hover:bg-[#FFF0F5] rounded-md transition-all duration-300"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/portfolio" element={<Portfolio addToCart={addToCart} />} />
        <Route path="/portfolio/:id" element={<ProductDetail type="cake" addToCart={addToCart} />} />
        <Route path="/sweeties" element={<Sweeties addToCart={addToCart} />} />
        <Route path="/sweeties/:id" element={<ProductDetail type="sweet" addToCart={addToCart} />} />
        <Route path="/search" element={<SearchResults products={allProducts} addToCart={addToCart} />} />
      </Routes>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <footer className="bg-[#F5F5F5] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p>© 2024 Aesthetic Cakes. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;