'use client';
import React from 'react'
import {Toaster} from 'react-hot-toast';

const Provider = ({children}) => {
  return (
    <>
        <Toaster/>
        {children}
    </>
  )
}

export default Provider;