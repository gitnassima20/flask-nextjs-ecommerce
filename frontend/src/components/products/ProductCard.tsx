"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  id, 
  name, 
  price, 
  imageUrl, 
  description,
  onAddToCart 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div 
      className="relative group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Favorite Button */}
      <button 
        onClick={() => setIsFavorite(!isFavorite)}
        className="absolute top-4 right-4 z-10 p-2 bg-white/70 rounded-full hover:bg-white/90 transition-colors"
      >
        <HeartIcon 
          className={`w-6 h-6 ${
            isFavorite 
              ? 'text-red-500 fill-current' 
              : 'text-gray-600 hover:text-red-500'
          }`} 
        />
      </button>

      {/* Product Image */}
      <div className="relative w-full h-64 overflow-hidden">
        <Image 
          src={imageUrl} 
          alt={name} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
        {description && (
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{description}</p>
        )}
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">${price.toFixed(2)}</span>
          <button 
            onClick={onAddToCart}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full 
              bg-blue-500 text-white 
              hover:bg-blue-600 
              transition-all duration-300
              ${isHovered ? 'translate-x-0' : 'translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}
            `}
          >
            <ShoppingCartIcon className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
