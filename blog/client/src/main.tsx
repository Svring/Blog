import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './Routes'
import './styles/index.css'
import { Paper } from '@mantine/core'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Paper sx={{
      width: '100%',
      minHeight: '100%',
      backgroundColor: '#0F1022',
    }} >
      <Routes />
    </Paper>
  </React.StrictMode>,
)
