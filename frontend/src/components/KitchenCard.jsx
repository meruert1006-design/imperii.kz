// frontend/src/components/KitchenCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { getFallbackImage, resolveImageUrl } from '../utils/media';

const formatPrice = (value) => {
  if (!value) return '';
  return Number(value).toLocaleString('ru-RU');
};

export default function KitchenCard({ kitchen }) {
  const image = resolveImageUrl(kitchen.images?.[0]?.url) || '/placeholder.jpg';

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={kitchen.name}
          className="h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.src = getFallbackImage();
          }}
        />
      </div>
      <div className="space-y-2 p-4">
        <h3 className="text-lg font-semibold text-slate-900">{kitchen.name}</h3>
        {kitchen.description && (
          <p className="text-sm text-slate-600">{kitchen.description}</p>
        )}
        {kitchen.facades?.length > 0 && (
          <p className="text-xs text-slate-500">
            Фасады: {kitchen.facades.map((facade) => facade.name).join(', ')}
          </p>
        )}
        <div className="flex items-start justify-between gap-4 text-sm">
          <div className="space-y-1">
            {kitchen.priceDiscount ? (
              <>
                <span className="block text-red-600 font-semibold">
                  Цена со скидкой {kitchen.discountPercent ? `${kitchen.discountPercent}%` : ''}:{' '}
                  {formatPrice(kitchen.priceDiscount)} тг
                </span>
                <span className="block text-red-500">
                  Основная цена:{' '}
                  {kitchen.priceOriginal
                    ? `${formatPrice(kitchen.priceOriginal)} тг`
                    : kitchen.priceFrom
                      ? `от ${formatPrice(kitchen.priceFrom)} тг`
                      : 'по запросу'}
                </span>
              </>
            ) : (
              <span className="block text-red-600 font-semibold">
                Цена: {kitchen.priceFrom ? `от ${formatPrice(kitchen.priceFrom)} тг` : 'по запросу'}
              </span>
            )}
          </div>
          <Link to={`/kitchens/${kitchen.id}`} className="font-medium text-orange-600">
            Подробнее
          </Link>
        </div>
      </div>
    </article>
  );
}
