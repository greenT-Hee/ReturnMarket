import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRouter({isAuth}) {
  if (isAuth) {
    return <Outlet />;
  }
  console.log(isAuth)
  return <Navigate to={"/"} replace />;
}
