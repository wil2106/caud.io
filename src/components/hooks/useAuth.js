import React from 'react'
import { useSelector } from 'react-redux'
import { selectLogin } from '../../app/userSlice'

const useAuth = () => {
  const user = useSelector(selectLogin)
  return user
}

export default useAuth
