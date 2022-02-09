import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { logout, getCurrentUser } from '../services/authService';
import { notify } from '../util/notify';

const MainLayout = ({ children }) => {
  const [currentUser, setCurrentUser] = useState('');

  const setUser = user => {
    setCurrentUser(user);
  };

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUser(user);
    }
  }, []);

  return (
    <div>

      <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <Link to={'/home'} className='navbar-brand'>
        </Link>
        <div className='navbar-nav mr-auto '>
          <li className='nav-item'>
            <Link to={'/home'} className='nav-link active'>
              CARWASH
            </Link>
          </li>
        </div>
        <div className='text-secondary mr-4 '>{currentUser.email}</div>
        <a
          href='/login'
          className='text-secondary float-right'
          onClick={logout}
        >
          Logout
        </a>
      </nav>
      <div>{children}</div>
      <footer className='bg-primary p-1 text-light text-center fixed-bottom'>
        CARWASH
      </footer>
    </div>
  );
};
MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default MainLayout;
