
import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  discountPrice,
  image,
  quantity
}) => {
  const { updateQuantity, removeItem } = useCart();

  const activePrice = discountPrice || price;
  const totalPrice = activePrice * quantity;

  const handleIncreaseQuantity = () => {
    updateQuantity(id, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    } else {
      removeItem(id);
    }
  };

  const handleRemoveItem = () => {
    removeItem(id);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="flex items-start space-x-4 py-6 border-b border-border animate-fade-in">
      {/* Product Image */}
      <Link 
        to={`/product/${id}`} 
        className="shrink-0 w-24 h-24 bg-secondary rounded-lg overflow-hidden"
      >
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </Link>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <Link 
          to={`/product/${id}`} 
          className="text-lg font-medium hover:text-accent transition-colors"
        >
          {name}
        </Link>

        {/* Price */}
        <div className="mt-1 flex items-center">
          {discountPrice ? (
            <>
              <span className="font-medium">{formatPrice(discountPrice)}</span>
              <span className="ml-2 text-sm text-muted-foreground line-through">
                {formatPrice(price)}
              </span>
            </>
          ) : (
            <span className="font-medium">{formatPrice(price)}</span>
          )}
        </div>

        {/* Quantity Controls - Mobile */}
        <div className="mt-3 flex items-center md:hidden">
          <div className="flex items-center rounded-full border border-border">
            <button
              onClick={handleDecreaseQuantity}
              className="btn-icon h-8 w-8"
              aria-label="Decrease quantity"
            >
              {quantity === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              onClick={handleIncreaseQuantity}
              className="btn-icon h-8 w-8"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>
          <button
            onClick={handleRemoveItem}
            className="ml-4 text-sm text-muted-foreground hover:text-destructive transition-colors flex items-center"
            aria-label="Remove item"
          >
            <Trash2 size={14} className="mr-1" />
            Remove
          </button>
        </div>
      </div>

      {/* Quantity Controls - Desktop */}
      <div className="hidden md:flex items-center space-x-3">
        <div className="flex items-center rounded-full border border-border">
          <button
            onClick={handleDecreaseQuantity}
            className="btn-icon h-8 w-8"
            aria-label="Decrease quantity"
          >
            {quantity === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
          </button>
          <span className="w-8 text-center">{quantity}</span>
          <button
            onClick={handleIncreaseQuantity}
            className="btn-icon h-8 w-8"
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Price Total - Desktop */}
      <div className="hidden md:block text-right min-w-[80px]">
        <span className="font-medium">{formatPrice(totalPrice)}</span>
      </div>

      {/* Remove Button - Desktop */}
      <div className="hidden md:block">
        <button
          onClick={handleRemoveItem}
          className="btn-icon text-muted-foreground hover:text-destructive transition-colors"
          aria-label="Remove item"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
