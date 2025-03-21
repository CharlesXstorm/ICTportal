"use client"

import React from 'react'
import AdminPanel from '../AdminPanel';
import Header from '../Header';
import Loading from '../ui/Loading';
import { useStore } from '@/store';

const AdminPage = () => {
  
    const loading = useStore((state) => state.loading);
    return (
      <div className="admin">
        {loading && (
          <Loading
            height="h-[100vh]"
            animHeight="h-[200px]"
            animWidth="w-[200px]"
            className={[loading ? "opacity-100" : "opacity-[0]", "fixed"]
              .filter(Boolean)
              .join(" ")}
          />
        )}
        <Header admin loggedIn />
  
        <div className="admin__container">
          <p className="admin__title">
            Admin Panel for the ICT training program 2025
          </p>
          <AdminPanel />
        </div>
      </div>
    );
}

export default AdminPage
