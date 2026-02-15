// frontend/src/layouts/PublicLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PublicLayout() {
  const whatsappPhone = '77010144807';
  const whatsappText = encodeURIComponent('Здравствуйте! Хочу заказать кухню.');
  const whatsappLink = `https://wa.me/${whatsappPhone}?text=${whatsappText}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        aria-label="Написать в WhatsApp"
        title="Написать в WhatsApp"
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
          <path
            fill="currentColor"
            d="M19.11 17.08c-.2-.1-1.16-.57-1.34-.64-.18-.07-.31-.1-.44.1-.13.2-.5.64-.61.77-.11.13-.23.15-.43.05-.2-.1-.83-.3-1.58-.97-.59-.52-.98-1.17-1.09-1.37-.11-.2-.01-.31.09-.41.09-.09.2-.23.31-.34.1-.11.13-.18.2-.3.07-.12.03-.23-.02-.33-.05-.1-.44-1.06-.6-1.45-.16-.38-.32-.33-.44-.34h-.38c-.13 0-.33.05-.5.23-.17.18-.66.64-.66 1.57 0 .93.68 1.82.77 1.95.1.13 1.34 2.05 3.25 2.88.45.2.81.32 1.08.41.46.15.88.13 1.21.08.37-.06 1.16-.47 1.32-.93.16-.46.16-.85.11-.93-.05-.08-.18-.13-.38-.23Zm-3.08-9.76c-4.36 0-7.9 3.53-7.9 7.9 0 1.4.37 2.76 1.08 3.95l-1.14 4.18 4.29-1.12c1.14.62 2.42.95 3.67.95 4.36 0 7.9-3.53 7.9-7.9 0-4.36-3.53-7.9-7.9-7.9Zm0 14.42c-1.11 0-2.2-.3-3.15-.87l-.23-.13-2.55.67.68-2.48-.15-.25c-.63-1.02-.96-2.2-.96-3.42 0-3.52 2.86-6.38 6.38-6.38 3.52 0 6.38 2.86 6.38 6.38 0 3.52-2.86 6.38-6.38 6.38Z"
          />
        </svg>
      </a>
      <Footer />
    </div>
  );
}
