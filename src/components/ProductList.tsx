import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { fetchProducts, fetchCategories, setSelectedCategory } from '../store/slices/productsSlice';
import ProductCard from './ProductCard';

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, categories, selectedCategory, isLoading, error } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '16rem' }}>
        <div style={{ fontSize: '1.5rem', color: '#666' }}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', color: '#dc2626', padding: '2rem' }}>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>Products</h1>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <button
            onClick={() => dispatch(setSelectedCategory('all'))}
            className="btn"
            style={{
              backgroundColor: selectedCategory === 'all' ? '#2563eb' : '#e5e7eb',
              color: selectedCategory === 'all' ? 'white' : '#374151'
            }}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => dispatch(setSelectedCategory(category))}
              className="btn"
              style={{
                backgroundColor: selectedCategory === category ? '#2563eb' : '#e5e7eb',
                color: selectedCategory === category ? 'white' : '#374151',
                textTransform: 'capitalize'
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '1rem' }}>
            {selectedCategory === 'all' ? '상품을 불러오는 중입니다...' : `'${selectedCategory}' 카테고리에 상품이 없습니다.`}
          </p>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => dispatch(setSelectedCategory('all'))}
              className="btn btn-primary"
              style={{ padding: '0.5rem 1rem' }}
            >
              모든 상품 보기
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;