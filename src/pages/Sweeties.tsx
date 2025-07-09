import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../components/CartModal';
import { sweeties } from '../data/products';

interface SweetiesProps {
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
}

function Sweeties({ addToCart }: SweetiesProps) {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  
  const categories = ["All", "Brownies", "Cookies", "Mousses"];
  
  const filteredSweeties = selectedCategory === "All" 
    ? sweeties 
    : sweeties.filter(sweet => sweet.category === selectedCategory);

  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Enhanced Header Section with Decorative Elements */}
        <div className="relative mb-16">
          {/* Top Decorative Element */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C71585] to-transparent"></div>
            <div className="mt-2 w-16 h-1 mx-auto bg-gradient-to-r from-transparent via-[#C71585] to-transparent relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#FFB6C1]"></div>
                <div className="w-2 h-2 rounded-full bg-[#C71585]"></div>
                <div className="w-2 h-2 rounded-full bg-[#FFB6C1]"></div>
              </div>
            </div>
          </div>

          {/* Main Title with Decorative Background */}
          <div className="relative text-center">
            <h1 className="text-4xl md:text-5xl font-serif text-[#C71585] mb-4">
              Delightful Sweeties
            </h1>

            {/* Subtitle */}
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Explore our delightful range of sweet treats, from fudgy brownies to delicate cookies
            </p>

            {/* Bottom Decorative Element - Symmetrical with top */}
            <div className="relative">
              <div className="w-16 h-1 mx-auto bg-gradient-to-r from-transparent via-[#C71585] to-transparent relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#FFB6C1]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#C71585]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#FFB6C1]"></div>
                </div>
              </div>
              <div className="mt-2 w-24 h-1 mx-auto bg-gradient-to-r from-transparent via-[#C71585] to-transparent"></div>
            </div>
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-[#C71585] text-white'
                  : 'bg-[#FFD1DC]/20 text-[#C71585] hover:bg-[#FFD1DC]/40'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sweeties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSweeties.map(sweet => (
            <div key={sweet.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Link to={`/sweeties/${sweet.id}`} className="block relative h-64">
                <img
                  src={sweet.image}
                  alt={sweet.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 text-[#C71585] px-3 py-1 rounded-full text-sm">
                    {sweet.category}
                  </span>
                </div>
              </Link>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <Link to={`/sweeties/${sweet.id}`} className="text-xl font-serif text-gray-800 hover:text-[#C71585] transition-colors">
                    {sweet.name}
                  </Link>
                  <span className="text-[#C71585] font-semibold">{sweet.price}</span>
                </div>
                <p className="text-gray-600 mb-4">{sweet.description}</p>
                <button 
                  onClick={() => addToCart(sweet)}
                  className="w-full bg-[#C71585] text-white px-6 py-2 rounded-full hover:bg-[#C71585]/90 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sweeties;