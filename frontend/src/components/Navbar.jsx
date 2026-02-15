// frontend/src/components/Navbar.jsx

import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const navLinks = [
  { path: '/', label: 'Главная' },
  { path: '/kitchens', label: 'Каталог' },
  { path: '/about', label: 'О компании' },
  { path: '/guarantee', label: 'Гарантия и доставка' },
  { path: '/contact', label: 'Контакты' }
];

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/meb.imperii.kz?igsh=MWxrNWpidWpqcmtlZQ==',
    svg: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          fill="currentColor"
          d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7Zm5 3.2a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6Zm0 2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6Zm5-2.7a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z"
        />
      </svg>
    )
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@meb.imperii.kz?_r=1&_t=ZS-93TFaocJ2bA',
    svg: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.7 3c.5 1.8 1.9 3.2 3.7 3.6v3.1c-1.4 0-2.8-.4-4-1.1v6.7a5.6 5.6 0 1 1-5.6-5.6c.3 0 .7 0 1 .1v3.1a2.5 2.5 0 1 0 1.6 2.4V3h3.3Z"
        />
      </svg>
    )
  }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkToken = () => setIsAdmin(Boolean(localStorage.getItem('token')));
    checkToken();
    window.addEventListener('storage', checkToken);
    return () => window.removeEventListener('storage', checkToken);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="text-lg font-semibold text-slate-900">
          Мебель Империи
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive ? 'text-orange-600' : 'hover:text-slate-900'
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="flex items-center gap-2 pl-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-orange-400 hover:text-orange-600"
                aria-label={link.label}
                title={link.label}
              >
                {link.svg}
              </a>
            ))}
          </div>
          <Link
            to="/request"
            className="rounded-full bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
          >
            Оставить заявку
          </Link>
          {isAdmin && (
            <Link to="/admin" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Вернуться в админку
            </Link>
          )}
        </nav>

        <button
          className="flex items-center gap-2 text-sm font-medium text-slate-600 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Меню
        </button>
      </div>

      {isOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="container flex flex-col gap-3 py-4 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600"
                >
                  {link.svg}
                </a>
              ))}
            </div>
            <Link
              to="/request"
              className="w-fit rounded-full bg-orange-500 px-4 py-2 text-white"
              onClick={() => setIsOpen(false)}
            >
              Оставить заявку
            </Link>
            {isAdmin && (
              <Link to="/admin" onClick={() => setIsOpen(false)}>
                Вернуться в админку
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

