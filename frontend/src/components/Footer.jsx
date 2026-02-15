// frontend/src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t bg-slate-900 text-slate-200">
      <div className="container grid gap-8 py-10 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold text-white">Мебель Империи</h3>
          <p className="mt-3 text-sm text-slate-300">
            Производим кухни на заказ с точной подгонкой и прозрачной сметой.
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-white">Навигация</p>
          <Link to="/kitchens" className="block text-slate-300 hover:text-white">
            Каталог кухонь
          </Link>
          <Link to="/about" className="block text-slate-300 hover:text-white">
            О компании
          </Link>
          <Link to="/guarantee" className="block text-slate-300 hover:text-white">
            Гарантия и доставка
          </Link>
          <Link to="/contact" className="block text-slate-300 hover:text-white">
            Контакты
          </Link>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-white">Контакты</p>
          <p className="text-slate-300">+7 701 014 4807</p>
          <p className="text-slate-300">meb.imperii@mail.ru</p>
          <p className="text-slate-300">
            г.Алматы, ARMADA CK, улц Кабдолов 1/8 3 блок В корпус 9 ряд
          </p>
          <div className="flex gap-3 pt-2">
            <a
              href="https://www.instagram.com/meb.imperii.kz?igsh=MWxrNWpidWpqcmtlZQ=="
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-slate-300 hover:border-orange-400 hover:text-white"
              aria-label="Instagram"
              title="Instagram"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7Zm5 3.2a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6Zm0 2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6Zm5-2.7a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z"
                />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@meb.imperii.kz?_r=1&_t=ZS-93TFaocJ2bA"
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-slate-300 hover:border-orange-400 hover:text-white"
              aria-label="TikTok"
              title="TikTok"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M16.7 3c.5 1.8 1.9 3.2 3.7 3.6v3.1c-1.4 0-2.8-.4-4-1.1v6.7a5.6 5.6 0 1 1-5.6-5.6c.3 0 .7 0 1 .1v3.1a2.5 2.5 0 1 0 1.6 2.4V3h3.3Z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-400">
        © 2025 Мебель Империи. Все права защищены.
      </div>
    </footer>
  );
}

