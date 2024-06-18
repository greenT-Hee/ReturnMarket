import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRouter({isAuth}) {
  if (!isAuth) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
}
