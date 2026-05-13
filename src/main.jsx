import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import router from './routes/Routes';
import AuthProvider from './providers/AuthProvider';

// এই দুটি লাইন ইম্পোর্ট করুন
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// একটি নতুন QueryClient তৈরি করুন
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      {/* QueryClientProvider দিয়ে মুড়িয়ে দিন */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)