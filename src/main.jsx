import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import App from './App';
import './index.css';
import { AppContextContainer } from './context/AppContextContainer';
import { AuthProvider } from './auth/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      {/* <BrowserRouter> */}
      <HashRouter>
        <AuthProvider>
          <AppContextContainer>
            <Routes>
              <Route path='/*' element={<App />} />
            </Routes>
          </AppContextContainer>
        </AuthProvider>
      </HashRouter>
      {/* </BrowserRouter> */}
    </ChakraProvider>
  </React.StrictMode>
)
