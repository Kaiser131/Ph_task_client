import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// tanstack query
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
// Create a client
const queryClient = new QueryClient();


import {
  RouterProvider,
} from "react-router";
import router from './Route/Routes.jsx';
import AuthProvider from './Providers/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
);
