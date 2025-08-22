import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import type { Product } from '../store/slices/productsSlice';
import { useAppDispatch } from '../hooks/redux';
import { addToCart } from '../store/slices/cartSlice';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    }));
  };

  return (
    <div className="card" style={{ overflow: 'hidden', transition: 'box-shadow 0.2s' }}>
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ width: '100%', overflow: 'hidden', backgroundColor: '#f3f4f6' }}>
          <img
            src={product.image}
            alt={product.title}
            style={{ height: '16rem', width: '100%', objectFit: 'contain' }}
          />
        </div>
        <div style={{ padding: '1rem' }}>
          <h3 className="line-clamp-2" style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827' }}>
            {product.title}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Star size={16} style={{ color: '#fbbf24' }} fill="currentColor" />
              <span style={{ marginLeft: '0.25rem', fontSize: '0.875rem', color: '#6b7280' }}>
                {product.rating.rate} ({product.rating.count})
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
            <p style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827' }}>
              ${product.price.toFixed(2)}
            </p>
            <button
              onClick={handleAddToCart}
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem' }}
            >
              <ShoppingCart size={16} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;