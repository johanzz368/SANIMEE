import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { BottomNav } from './BottomNav';
import { Footer } from './Footer';
import { AmbientBackground } from './AmbientBackground';

export const Layout: React.FC = () => {
  return (
    <>
      <AmbientBackground />
      <Navbar />
      <main id="main-content" className="pt-16 md:pt-24 min-h-dvh">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
};
