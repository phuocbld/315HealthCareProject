import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RouteComponent = ({ isAuth, Component, redirectPath, isAdmin }) => {
    const token = localStorage.getItem('USER_INFO');
    console.log(isAuth);
    if (isAuth) return token ? <Component /> : <Navigate to={redirectPath} />
    return (
        <Component />
    );
};

export default RouteComponent;