
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  discountPrice,
  image,
  rating,
  reviews,
  category,
  isNew = false,
  isBestSeller = false,
  className,
}) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id,
      name,
      price,
      discountPrice,
      image,
      category,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div 
      className={cn(
        "group relative bg-white rounded-2xl overflow-hidden shadow-sm hover-card transition-all duration-300",
        className
      )}
    >
      {/* Product Image */}
      <Link to={`/product/${id}`} className="block aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </Link>

      {/* Tags */}
      <div className="absolute top-3 left-3 flex flex-col gap-2">
        {discountPrice && (
          <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full animate-pulse-soft">
            {Math.round(((price - discountPrice) / price) * 100)}% OFF
          </span>
        )}
        {isNew && (
          <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            NEW
          </span>
        )}
        {isBestSeller && (
          <span className="bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            BEST SELLER
          </span>
        )}
      </div>

      {/* Quick Actions */}
      <div className="absolute top-3 right-3 flex flex-col gap-2">
        <button 
          className="btn-icon bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-all"
          aria-label="Add to wishlist"
        >
          <Heart size={16} className="text-foreground" />
        </button>
        <button 
          onClick={handleAddToCart}
          className="btn-icon bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-all"
          aria-label="Add to cart"
        >
          <ShoppingBag size={16} className="text-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <Link 
          to={`/product/${id}`}
          className="block mt-1 text-lg font-medium text-foreground hover:text-accent transition-colors"
        >
          {name}
        </Link>

        {/* Category */}
        <Link 
          to={`/products?category=${category}`}
          className="text-xs uppercase tracking-wider text-muted-foreground hover:text-accent transition-colors"
        >
          {category}
        </Link>

        {/* Rating */}
        <div className="flex items-center mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={cn(
                  "text-amber-400",
                  i >= Math.round(rating) && "text-gray-300"
                )}
                fill={i < Math.round(rating) ? "currentColor" : "none"}
              />
            ))}
          </div>
          <span className="ml-1 text-xs text-muted-foreground">
            ({reviews})
          </span>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-center">
          {discountPrice ? (
            <>
              <span className="text-lg font-medium">{formatPrice(discountPrice)}</span>
              <span className="ml-2 text-sm text-muted-foreground line-through">
                {formatPrice(price)}
              </span>
            </>
          ) : (
            <span className="text-lg font-medium">{formatPrice(price)}</span>
          )}
        </div>

        {/* Add to Cart Button (Mobile/Larger) */}
        <button
          onClick={handleAddToCart}
          className="w-full mt-4 btn-primary"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
