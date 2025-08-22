import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import type { Product } from '../store/slices/productsSlice';
import { useAppDispatch } from '../hooks/redux';
import { addToCart } from '../store/slices/cartSlice';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const productData = await response.json();
        setProduct(productData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      }));
    }
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '16rem' }}>
        <div style={{ fontSize: '1.5rem', color: '#666' }}>Loading...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container" style={{ padding: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#dc2626', marginBottom: '1rem' }}>{error || 'Product not found'}</p>
          <Link to="/" style={{ color: '#2563eb', textDecoration: 'none' }}>
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <Link 
        to="/" 
        style={{ display: 'inline-flex', alignItems: 'center', color: '#2563eb', textDecoration: 'none', marginBottom: '2rem' }}
      >
        <ArrowLeft size={20} style={{ marginRight: '0.5rem' }} />
        Back to Products
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <img
            src={product.image}
            alt={product.title}
            style={{ width: '100%', height: '24rem', objectFit: 'contain', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', fontSize: '0.875rem', fontWeight: '500', color: '#2563eb', backgroundColor: '#dbeafe', borderRadius: '9999px', textTransform: 'capitalize' }}>
              {product.category}
            </span>
          </div>

          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>
            {product.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Star size={20} style={{ color: '#fbbf24' }} fill="currentColor" />
              <span style={{ marginLeft: '0.25rem', fontSize: '1.125rem', color: '#6b7280' }}>
                {product.rating.rate}
              </span>
            </div>
            <span style={{ color: '#9ca3af' }}>•</span>
            <span style={{ color: '#6b7280' }}>
              {product.rating.count} reviews
            </span>
          </div>

          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827' }}>
            ${product.price.toFixed(2)}
          </div>

          <div style={{ color: '#6b7280', lineHeight: '1.6' }}>
            <p>{product.description}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button
              onClick={handleAddToCart}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '1.125rem', fontWeight: '500' }}
            >
              <ShoppingCart size={24} />
              <span>Add to Cart</span>
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
              <div>
                <strong>Category:</strong> {product.category}
              </div>
              <div>
                <strong>Rating:</strong> {product.rating.rate}/5
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;