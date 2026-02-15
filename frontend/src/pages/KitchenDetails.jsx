// frontend/src/pages/KitchenDetails.jsx

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api';
import { getFallbackImage, resolveImageUrl } from '../utils/media';

const formatPrice = (value) => {
  if (!value) return '';
  return Number(value).toLocaleString('ru-RU');
};

export default function KitchenDetails() {
  const { id } = useParams();
  const [kitchen, setKitchen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchKitchen = async () => {
      try {
        const response = await api.get(`/kitchens/${id}`);
        setKitchen(response.data);
      } catch (error) {
        console.error('Kitchen fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchKitchen();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-10 text-sm text-slate-500">Загрузка кухни...</div>
    );
  }

  if (!kitchen) {
    return (
      <div className="container py-10 text-sm text-slate-500">Кухня не найдена.</div>
    );
  }

  const images = kitchen.images?.length ? kitchen.images : [{ url: '/placeholder.jpg' }];

  return (
    <section className="py-10">
      <div className="container grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
            <img
              src={resolveImageUrl(images[activeImage]?.url)}
              alt={kitchen.name}
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.src = getFallbackImage();
              }}
            />
          </div>
          <div className="flex gap-3">
            {images.map((img, index) => (
              <button
                key={`${img.url}-${index}`}
                onClick={() => setActiveImage(index)}
                className={`h-16 w-20 overflow-hidden rounded-lg border ${
                  activeImage === index ? 'border-orange-500' : 'border-slate-200'
                }`}
              >
                <img
                  src={resolveImageUrl(img.url)}
                  alt="kitchen"
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.src = getFallbackImage();
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-orange-500">
              {kitchen.category?.name || 'Кухонная мебель'}
            </p>
            <h1 className="text-3xl font-semibold text-slate-900">{kitchen.name}</h1>
            {kitchen.priceDiscount ? (
              <div className="mt-3 space-y-1 text-sm">
                <p className="text-red-600 font-semibold">
                  Цена со скидкой {kitchen.discountPercent ? `${kitchen.discountPercent}%` : ''}:{' '}
                  {formatPrice(kitchen.priceDiscount)} тг
                </p>
                <p className="text-red-500">
                  Основная цена:{' '}
                  {kitchen.priceOriginal
                    ? `${formatPrice(kitchen.priceOriginal)} тг`
                    : kitchen.priceFrom
                      ? `от ${formatPrice(kitchen.priceFrom)} тг`
                      : 'по запросу'}
                </p>
              </div>
            ) : (
              <p className="mt-2 text-sm text-slate-600">
                Цена: {kitchen.priceFrom ? `от ${formatPrice(kitchen.priceFrom)} тг` : 'по запросу'}
              </p>
            )}
          </div>
          {kitchen.description && <p className="text-sm text-slate-600">{kitchen.description}</p>}
          <div>
            <p className="text-sm font-semibold text-slate-900">Материалы:</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {kitchen.materials?.length ? (
                kitchen.materials.map((material) => (
                  <span
                    key={material.id}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600"
                  >
                    {material.name}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-500">Подбираются индивидуально</span>
              )}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Фасады:</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {kitchen.facades?.length ? (
                kitchen.facades.map((facade) => (
                  <span
                    key={facade.id}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600"
                  >
                    {facade.name}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-500">Подбираются индивидуально</span>
              )}
            </div>
          </div>
          <Link
            to="/request"
            className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600"
          >
            Оставить заявку
          </Link>
          {kitchen.videoUrl && (
            <div className="pt-2">
              <video
                controls
                className="w-full rounded-xl border border-slate-200"
                src={resolveImageUrl(kitchen.videoUrl)}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
