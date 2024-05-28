import PropTypes from 'prop-types';
//import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProteccionRouter = ({ isLoggedIn }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to='/login' />;
};

ProteccionRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default ProteccionRouter;
