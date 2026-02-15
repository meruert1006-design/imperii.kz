// frontend/src/pages/Catalog.jsx

import React, { useEffect, useState } from 'react';
import api from '../api';
import KitchenCard from '../components/KitchenCard';

export default function Catalog() {
  const [kitchens, setKitchens] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kitchensRes, categoriesRes] = await Promise.all([
          api.get('/kitchens'),
          api.get('/categories')
        ]);
        setKitchens(kitchensRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error('Catalog fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtered = activeCategory
    ? kitchens.filter((kitchen) => {
        if (typeof activeCategory === 'number') {
          return kitchen.category?.id === activeCategory;
        }
        return (
          kitchen.category?.name?.toLowerCase() === String(activeCategory).toLowerCase()
        );
      })
    : kitchens;

  const setCategoryByName = (name) => {
    const found = categories.find(
      (category) => category.name?.toLowerCase() === name.toLowerCase()
    );
    setActiveCategory(found ? found.id : name);
  };

  const isActiveName = (name) => {
    const found = categories.find(
      (category) => category.name?.toLowerCase() === name.toLowerCase()
    );
    if (found) {
      return activeCategory === found.id;
    }
    return String(activeCategory).toLowerCase() === name.toLowerCase();
  };

  return (
    <section className="py-10">
      <div className="container space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Каталог кухонь</h1>
            <p className="text-sm text-slate-600">Выберите стиль, материалы и стоимость.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Фильтры
            </span>
            <button
              className={`rounded-full px-4 py-2 text-sm ${
                !activeCategory ? 'bg-orange-500 text-white' : 'border border-slate-200 text-slate-600'
              }`}
              onClick={() => setActiveCategory(null)}
            >
              Все
            </button>
            <button
              className={`rounded-full px-4 py-2 text-sm ${
                isActiveName('Фасады')
                  ? 'bg-orange-500 text-white'
                  : 'border border-slate-200 text-slate-600'
              }`}
              onClick={() => setCategoryByName('Фасады')}
            >
              Фасады
            </button>
            <button
              className={`rounded-full px-4 py-2 text-sm ${
                isActiveName('Кухни')
                  ? 'bg-orange-500 text-white'
                  : 'border border-slate-200 text-slate-600'
              }`}
              onClick={() => setCategoryByName('Кухни')}
            >
              Кухни
            </button>
            <button
              className={`rounded-full px-4 py-2 text-sm ${
                isActiveName('Шкафы')
                  ? 'bg-orange-500 text-white'
                  : 'border border-slate-200 text-slate-600'
              }`}
              onClick={() => setCategoryByName('Шкафы')}
            >
              Шкафы
            </button>
            <button
              className={`rounded-full px-4 py-2 text-sm ${
                isActiveName('Тумбочки')
                  ? 'bg-orange-500 text-white'
                  : 'border border-slate-200 text-slate-600'
              }`}
              onClick={() => setCategoryByName('Тумбочки')}
            >
              Тумбочки
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`rounded-full px-4 py-2 text-sm ${
                  activeCategory === category.id
                    ? 'bg-orange-500 text-white'
                    : 'border border-slate-200 text-slate-600'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="rounded-xl border border-dashed border-slate-200 p-10 text-center text-sm text-slate-500">
            Загрузка каталога...
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((kitchen) => (
              <KitchenCard key={kitchen.id} kitchen={kitchen} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
