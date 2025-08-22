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
    console.log('ProductList: Starting to fetch products and categories');
    dispatch(fetchProducts()).then((result) => {
      console.log('fetchProducts result:', result);
    }).catch((error) => {
      console.error('fetchProducts error:', error);
    });
    
    dispatch(fetchCategories()).then((result) => {
      console.log('fetchCategories result:', result);
    }).catch((error) => {
      console.error('fetchCategories error:', error);
    });
  }, [dispatch]);

  // 디버깅을 위한 상태 로그
  useEffect(() => {
    console.log('ProductList: State updated', { 
      products: products.length, 
      categories: categories.length, 
      isLoading, 
      error,
      selectedCategory,
      environment: process.env.NODE_ENV
    });
  }, [products, categories, isLoading, error, selectedCategory]);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);


  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '16rem' }}>
        <div style={{ fontSize: '1.5rem', color: '#666', marginBottom: '1rem' }}>Loading products...</div>
        <div style={{ fontSize: '1rem', color: '#999' }}>Environment: {process.env.NODE_ENV}</div>
        <div style={{ fontSize: '0.875rem', color: '#999', marginTop: '0.5rem' }}>
          Products: {products.length} | Categories: {categories.length}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', color: '#dc2626', padding: '2rem' }}>
        <p>Error: {error}</p>
        <div style={{ fontSize: '0.875rem', color: '#999', marginTop: '1rem' }}>
          Environment: {process.env.NODE_ENV} | Products: {products.length}
        </div>
        {products.length > 0 && (
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '0.375rem' }}
          >
            Try Again
          </button>
        )}
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