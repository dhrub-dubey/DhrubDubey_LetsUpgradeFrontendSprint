import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Cake, Clock, Phone, Mail, Instagram } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { cakes, sweeties } from '../data/products';
import { CartItem } from '../components/CartModal';

interface HomeProps {
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
}

function Home({ addToCart }: HomeProps) {
  const [showAboutConfetti, setShowAboutConfetti] = useState(false);
  const [showContactConfetti, setShowContactConfetti] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Select featured items from both cakes and sweeties
  const featuredItems = [
    { ...cakes[0], type: 'cake' },    // Classic Wedding Cake
    { ...sweeties[0], type: 'sweet' }, // Classic Chocolate Brownies
    { ...cakes[6], type: 'cake' },    // Mirror Glaze Galaxy Cake
    { ...sweeties[1], type: 'sweet' }, // Chocolate Mango Mousse
    { ...cakes[2], type: 'cake' },    // Chocolate Cake
    { ...cakes[7], type: 'cake' }     // Geometric Gold Cake
  ];

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      const contactSection = document.getElementById('contact');

      if (aboutSection) {
        const aboutRect = aboutSection.getBoundingClientRect();
        if (aboutRect.top <= window.innerHeight * 0.75 && !showAboutConfetti) {
          setShowAboutConfetti(true);
        }
      }

      if (contactSection) {
        const contactRect = contactSection.getBoundingClientRect();
        if (contactRect.top <= window.innerHeight * 0.75 && !showContactConfetti) {
          setShowContactConfetti(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAboutConfetti, showContactConfetti]);

  const renderConfetti = () => {
    const confetti = [];
    const colors = ['#FFD1DC', '#C71585', '#FF69B4', '#FFB6C1'];
    
    for (let i = 0; i < 50; i++) {
      const style = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        animation: `confetti-fall ${1 + Math.random() * 2}s forwards`,
        animationDelay: `${Math.random() * 0.5}s`,
      };
      confetti.push(<div key={i} className="confetti" style={style} />);
    }
    return confetti;
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formRef.current) return;

    try {
      setIsSubmitting(true);
      const result = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (result.text === 'OK') {
        // Note: Toast notification is now handled in App.tsx
        formRef.current.reset();
      }
    } catch (error) {
      // Note: Error handling could also use toast notifications
      console.error('Error sending email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="pt-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFD1DC]/30 to-white/80"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(#FF69B4 1px, transparent 1px), radial-gradient(#FF69B4 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px',
          opacity: 0.1
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-5xl md:text-6xl font-serif text-[#C71585] mb-4">
                Crafting Sweet Memories
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Artisanal cakes that taste as beautiful as they look
              </p>
              <Link to="/portfolio" className="inline-block">
                <button className="bg-[#C71585] text-white px-8 py-3 rounded-full hover:bg-[#C71585]/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                  Order Now
                </button>
              </Link>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#FFD1DC] to-[#FF69B4] rounded-lg opacity-30 blur"></div>
                <div className="relative w-full h-80 md:h-96">
                  <img
                    src={`${import.meta.env.BASE_URL || '/'}assets/purechocolatecake.png`}
                    alt="Signature Cake"
                    className="w-full h-full object-cover rounded-lg shadow-xl transform hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative">
        <div className="confetti-container">
          {showAboutConfetti && renderConfetti()}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif text-center text-[#C71585] mb-16">Our Story</h2>
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-gray-600 mb-8">
              At Aesthetic Cakes, we believe every celebration deserves a centerpiece as unique as the moment itself. 
              Our passionate team of artisan bakers combines traditional techniques with modern design to create 
              unforgettable masterpieces that taste as extraordinary as they look.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 featured-section-bg relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: `radial-gradient(#FF69B4 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-[#C71585] mb-4">Featured Creations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most beloved and exquisite creations, each crafted with passion and artistry
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map((item, index) => (
              <div 
                key={index} 
                className="featured-card relative bg-white p-2 rounded-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                <Link 
                  to={`/${item.type === 'cake' ? 'portfolio' : 'sweeties'}/${item.id}`} 
                  className="block relative h-72 rounded-lg overflow-hidden group"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-6">
                    <h3 className="text-white text-xl font-serif mb-2 text-center px-4">{item.name}</h3>
                    <span className="text-white/90 mb-4">{item.price}</span>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(item);
                      }}
                      className="bg-white text-[#C71585] px-6 py-2 rounded-full hover:bg-[#FFD1DC] transition-colors transform hover:scale-105"
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
                <div className="p-4">
                  <h3 className="text-xl font-serif text-gray-800 mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#C71585] font-semibold">{item.price}</span>
                    <button 
                      onClick={() => addToCart(item)}
                      className="bg-[#C71585] text-white px-4 py-2 rounded-full hover:bg-[#C71585]/90 transition-colors text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white relative">
        <div className="confetti-container">
          {showContactConfetti && renderConfetti()}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif text-center text-[#C71585] mb-16">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-serif text-gray-800 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-[#C71585] mr-3" />
                  <span className="text-gray-600">(555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-[#C71585] mr-3" />
                  <span className="text-gray-600">
                    <a 
                      href="mailto:dhrubdubey5997@gmail.com"
                      className="hover:text-[#C71585] transition-colors"
                    >
                      dhrubdubey5997@gmail.com
                    </a>
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-[#C71585] mr-3" />
                  <span className="text-gray-600">Mon-Sat: 9AM-6PM</span>
                </div>
                <div className="flex items-center">
                  <Instagram className="h-5 w-5 text-[#C71585] mr-3" />
                  <span className="text-gray-600">
                    <a 
                      href="https://www.instagram.com/aesthetic._cakes?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-[#C71585] transition-colors"
                    >
                      @aesthetic._cakes
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="user_name"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C71585]/50"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="user_email"
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C71585]/50"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C71585]/50"
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#C71585] text-white px-8 py-3 rounded-full hover:bg-[#C71585]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;