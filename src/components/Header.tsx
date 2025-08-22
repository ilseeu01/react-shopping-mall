import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { logout as logoutAction } from '../store/slices/authSlice';
import { logout } from '../services/authService';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logoutAction());
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logo}>
            ShopMall
          </Link>
          
          <nav className={styles.nav}>
            <Link to="/" className={styles.navLink}>
              Products
            </Link>
          </nav>

          <div className={styles.actions}>
            <Link to="/cart" className={styles.cartButton}>
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className={styles.cartBadge}>
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className={styles.userInfo}>
                <span className={styles.userName}>Hello, {user.email}</span>
                <button
                  onClick={handleLogout}
                  className={styles.logoutButton}
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/login" className={styles.loginLink}>
                <User size={20} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;