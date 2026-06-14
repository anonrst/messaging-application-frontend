import { EnvConfig } from '@/util/envConfg'
import React, { useLayoutEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

const ProtectedRoute = () => {

  return (
    <Outlet/>
  )
}

export default ProtectedRoute