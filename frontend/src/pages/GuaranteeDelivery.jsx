// frontend/src/pages/GuaranteeDelivery.jsx

import React from 'react';

export default function GuaranteeDelivery() {
  return (
    <section className="py-12">
      <div className="container space-y-8">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold text-slate-900">Гарантия и доставка</h1>
          <p className="text-sm text-slate-600">
            Мы ценим доверие клиентов, поэтому подробно рассказываем о гарантийных обязательствах,
            сроках и условиях доставки.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Гарантия</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>• Гарантия на корпус и фасады — 12 месяцев.</li>
              <li>• Гарантия на фурнитуру — по условиям производителя (обычно 12–24 месяца).</li>
              <li>• Бесплатное устранение производственных дефектов.</li>
              <li>• Поддержка после установки: консультации и сервис.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Доставка и установка</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>• Срок изготовления — от 20 до 30 рабочих дней.</li>
              <li>• Доставка по Алматы и области (условия уточняются при заказе).</li>
              <li>• Подъём и занос согласовываются отдельно.</li>
              <li>• Установка — в день доставки или по договорённости.</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6 text-sm text-slate-700">
          <p className="font-medium text-slate-900">Важно</p>
          <p className="mt-2">
            Условия могут меняться в зависимости от выбранных материалов, размера кухни и логистики.
            Точные сроки и стоимость мы подтверждаем после замера и согласования проекта.
          </p>
        </div>
      </div>
    </section>
  );
}
