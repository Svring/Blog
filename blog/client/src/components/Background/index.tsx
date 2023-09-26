import React from 'react';
import './style.css';
import { Flex } from '@mantine/core';
import App from './background';

const Background = () => {
  return (
    <Flex sx={{
      width: '100vw',
      height: '100vh',
      position: 'absolute',
      zIndex: 0,
    }} >
      <App />
    </Flex>
  )
}

export default Background;
