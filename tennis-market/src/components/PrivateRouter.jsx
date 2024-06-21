import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { user_info, user_role } from '../atom/Atom';
import { useRecoilValue } from 'recoil';

export  function PrivateRouter({isAuth=null}) {
  const userRole = useRecoilValue(user_role);
  if (isAuth === userRole) {
    return <Outlet />;
  } 
  return <Navigate to={"/"} replace />;
};

export function IsLoginRouter() {
  const uesrInfo = useRecoilValue(user_info);
  if (uesrInfo === "") {
    return <Outlet />;
  } 
  return <Navigate to={"/"} replace />;
}
