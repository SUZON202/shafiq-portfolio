import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import router from './routes/Routes';
import AuthProvider from './providers/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// ১. একটি নতুন QueryClient তৈরি করুন এবং এখানে কিছু সেটিংস যোগ করুন
// এতে আপনার সাইট বারবার লোড না হয়ে ক্যাশ থেকে ডাটা দেখাবে (ইন্সট্যান্ট ফিল হবে)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // ৫ মিনিট পর্যন্ত ডাটা ক্যাশ থেকে দেখাবে
      cacheTime: 1000 * 60 * 10, // ১০ মিনিট পর্যন্ত ডাটা মেমোরিতে ধরে রাখবে
      refetchOnWindowFocus: false, // ট্যাব পরিবর্তন করলে বারবার ডাটা ফেচ হবে না
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ২. QueryClientProvider দিয়ে পুরো অ্যাপটি মুড়িয়ে দেওয়া হলো */}
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
)