import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { updateQuantity, removeFromCart, clearCart } from '../store/slices/cartSlice';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, total } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    // 로그인 체크
    if (!user) {
      const shouldLogin = window.confirm('결제를 진행하려면 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?');
      if (shouldLogin) {
        navigate('/login');
      }
      return;
    }

    // 결제 처리 로직
    const shouldProceed = window.confirm(`총 $${total.toFixed(2)}를 결제하시겠습니까?`);
    if (shouldProceed) {
      alert('결제가 완료되었습니다!');
      // 결제 완료 후 장바구니 초기화
      dispatch(clearCart());
    }
  };

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: '2rem' }}>
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <ShoppingBag size={64} style={{ margin: '0 auto', color: '#9ca3af', marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>Your cart is empty</h2>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Start shopping to add items to your cart!</p>
          <Link
            to="/"
            className="btn btn-primary"
            style={{ padding: '0.75rem 1.5rem', textDecoration: 'none' }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>Shopping Cart</h1>
        <button
          onClick={handleClearCart}
          style={{ color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
        >
          <Trash2 size={20} />
          <span>Clear Cart</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {items.map((item) => (
              <div key={item.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ height: '5rem', width: '5rem', objectFit: 'contain', borderRadius: '0.375rem' }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    style={{ padding: '0.25rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', background: 'white', cursor: 'pointer' }}
                  >
                    <Minus size={16} />
                  </button>
                  <span style={{ width: '3rem', textAlign: 'center' }}>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    style={{ padding: '0.25rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', background: 'white', cursor: 'pointer' }}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  style={{ padding: '0.5rem', color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '0.5rem' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827', marginBottom: '1rem' }}>Order Summary</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div style={{ borderTop: '1px solid #d1d5db', paddingTop: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '500' }}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            {!user && (
              <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#fef3c7', border: '1px solid #f59e0b', borderRadius: '0.375rem', fontSize: '0.875rem', color: '#92400e' }}>
                💡 로그인하면 결제를 진행할 수 있습니다.
              </div>
            )}
            <button 
              onClick={handleCheckout}
              className="btn btn-primary" 
              style={{ width: '100%', padding: '0.75rem 1rem', fontWeight: '500' }}
            >
              {user ? 'Proceed to Checkout' : 'Login to Checkout'}
            </button>
            <Link
              to="/"
              style={{ display: 'block', width: '100%', textAlign: 'center', marginTop: '1rem', color: '#2563eb', textDecoration: 'none' }}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;