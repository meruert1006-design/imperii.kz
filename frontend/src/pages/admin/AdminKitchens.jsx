// frontend/src/pages/admin/AdminKitchens.jsx

import React, { useEffect, useState } from 'react';
import api, { uploadImage } from '../../api';
import { getFallbackImage, resolveImageUrl } from '../../utils/media';

const emptyForm = {
  id: null,
  name: '',
  description: '',
  priceFrom: '',
  priceOriginal: '',
  priceDiscount: '',
  discountPercent: '',
  videoUrl: '',
  instagramUrl: '',
  categoryId: '',
  materialIds: [],
  facadeIds: [],
  imageUrls: []
};

export default function AdminKitchens() {
  const [kitchens, setKitchens] = useState([]);
  const [categories, setCategories] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [facades, setFacades] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });
  const [imageInput, setImageInput] = useState('');

  const loadData = async () => {
    const [kitchensRes, categoriesRes, materialsRes, facadesRes] = await Promise.all([
      api.get('/kitchens'),
      api.get('/categories'),
      api.get('/materials'),
      api.get('/facades')
    ]);
    setKitchens(kitchensRes.data);
    setCategories(categoriesRes.data);
    setMaterials(materialsRes.data);
    setFacades(facadesRes.data);
  };

  useEffect(() => {
    loadData().catch((error) => console.error('Kitchen admin load error', error));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const normalizeInstagramUrl = (value) => {
    if (!value) return '';
    const match = value.match(/https?:\/\/www\.instagram\.com\/[^"'\s]+/);
    if (match) {
      return match[0].replace(/\?.*$/, '');
    }
    return value.trim();
  };

  const handleMaterialToggle = (id) => {
    setForm((prev) => ({
      ...prev,
      materialIds: prev.materialIds.includes(id)
        ? prev.materialIds.filter((item) => item !== id)
        : [...prev.materialIds, id]
    }));
  };

  const handleFacadeToggle = (id) => {
    setForm((prev) => ({
      ...prev,
      facadeIds: prev.facadeIds.includes(id)
        ? prev.facadeIds.filter((item) => item !== id)
        : [...prev.facadeIds, id]
    }));
  };

  const handleAddImageUrl = () => {
    if (!imageInput.trim()) return;
    setForm((prev) => ({ ...prev, imageUrls: [...prev.imageUrls, imageInput.trim()] }));
    setImageInput('');
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const response = await uploadImage(file);
      setForm((prev) => ({ ...prev, imageUrls: [...prev.imageUrls, response.url] }));
      setStatus({ loading: false, error: '', success: 'Фото загружено.' });
    } catch (error) {
      console.error('Upload failed', error);
      setStatus({
        loading: false,
        error: error.response?.data?.error || 'Не удалось загрузить фото',
        success: ''
      });
    }
  };

  const handleRemoveImage = (url) => {
    setForm((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((item) => item !== url)
    }));
  };

  const handleEdit = (kitchen) => {
    setForm({
      id: kitchen.id,
      name: kitchen.name,
      description: kitchen.description || '',
      priceFrom: kitchen.priceFrom || '',
      priceOriginal: kitchen.priceOriginal || '',
      priceDiscount: kitchen.priceDiscount || '',
      discountPercent: kitchen.discountPercent || '',
      videoUrl: kitchen.videoUrl || '',
      instagramUrl: kitchen.instagramUrl || '',
      categoryId: kitchen.category?.id || '',
      materialIds: kitchen.materials?.map((mat) => mat.id) || [],
      facadeIds: kitchen.facades?.map((facade) => facade.id) || [],
      imageUrls: kitchen.images?.map((img) => img.url) || []
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Удалить кухню?')) return;
    await api.delete(`/kitchens/${id}`);
    await loadData();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: '', success: '' });
    try {
      const payload = {
        name: form.name,
        description: form.description || undefined,
        priceFrom: form.priceFrom ? Number(form.priceFrom) : undefined,
        priceOriginal: form.priceOriginal ? Number(form.priceOriginal) : undefined,
        priceDiscount: form.priceDiscount ? Number(form.priceDiscount) : undefined,
        discountPercent: form.discountPercent ? Number(form.discountPercent) : undefined,
        videoUrl: form.videoUrl || undefined,
        instagramUrl: normalizeInstagramUrl(form.instagramUrl) || undefined,
        categoryId: form.categoryId ? Number(form.categoryId) : undefined,
        materialIds: form.materialIds,
        facadeIds: form.facadeIds,
        imageUrls: form.imageUrls
      };

      if (form.id) {
        await api.put(`/kitchens/${form.id}`, payload);
      } else {
        await api.post('/kitchens', payload);
      }

      setForm(emptyForm);
      await loadData();
    } catch (error) {
      const apiError = error.response?.data;
      const detailMessage = Array.isArray(apiError?.details)
        ? apiError.details.map((item) => item.msg).join(', ')
        : '';
      setStatus({
        loading: false,
        error: detailMessage || apiError?.error || 'Ошибка сохранения',
        success: ''
      });
      return;
    }
    setStatus({ loading: false, error: '', success: 'Кухня сохранена.' });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Список кухонь</h2>
        <div className="space-y-3">
          {kitchens.map((kitchen) => (
            <div key={kitchen.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">{kitchen.category?.name || 'Без категории'}</p>
                  <h3 className="text-lg font-semibold text-slate-900">{kitchen.name}</h3>
                  <p className="text-sm text-slate-600">
                    {kitchen.priceFrom ? `от ${kitchen.priceFrom} ₽` : 'по запросу'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="rounded-md border border-slate-200 px-3 py-1 text-xs text-slate-600"
                    onClick={() => handleEdit(kitchen)}
                  >
                    Редактировать
                  </button>
                  <button
                    className="rounded-md border border-red-200 px-3 py-1 text-xs text-red-500"
                    onClick={() => handleDelete(kitchen.id)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
          {!kitchens.length && (
            <p className="text-sm text-slate-500">Кухни пока не добавлены.</p>
          )}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-slate-200 bg-white p-6"
      >
        <h3 className="text-lg font-semibold text-slate-900">
          {form.id ? 'Редактировать кухню' : 'Добавить кухню'}
        </h3>
        <div>
          <label className="text-sm font-medium text-slate-700">Название</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Описание</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Цена от</label>
          <input
            name="priceFrom"
            value={form.priceFrom}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Основная цена</label>
          <input
            name="priceOriginal"
            value={form.priceOriginal}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Цена со скидкой</label>
          <input
            name="priceDiscount"
            value={form.priceDiscount}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Скидка %</label>
          <input
            name="discountPercent"
            value={form.discountPercent}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Видео (ссылка)</label>
          <input
            name="videoUrl"
            value={form.videoUrl}
            onChange={handleChange}
            placeholder="https://..."
            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Instagram (ссылка)</label>
          <input
            name="instagramUrl"
            value={form.instagramUrl}
            onChange={handleChange}
            placeholder="https://www.instagram.com/reel/..."
            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          <p className="mt-1 text-xs text-slate-500">
            Можно вставить ссылку или embed-код — мы возьмём правильный URL.
          </p>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Категория</label>
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="">Без категории</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Материалы</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {materials.map((material) => (
              <button
                key={material.id}
                type="button"
                onClick={() => handleMaterialToggle(material.id)}
                className={`rounded-full border px-3 py-1 text-xs ${
                  form.materialIds.includes(material.id)
                    ? 'border-orange-500 bg-orange-50 text-orange-600'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                {material.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Фасады</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {facades.map((facade) => (
              <button
                key={facade.id}
                type="button"
                onClick={() => handleFacadeToggle(facade.id)}
                className={`rounded-full border px-3 py-1 text-xs ${
                  form.facadeIds.includes(facade.id)
                    ? 'border-orange-500 bg-orange-50 text-orange-600'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                {facade.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Фотографии</label>
          <div className="mt-2 flex gap-2">
            <input
              value={imageInput}
              onChange={(event) => setImageInput(event.target.value)}
              placeholder="Ссылка на изображение"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={handleAddImageUrl}
              className="rounded-lg border border-slate-200 px-3 text-sm"
            >
              Добавить
            </button>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
            <input type="file" accept="image/*" onChange={handleUpload} />
          </div>
        <div className="mt-2 flex flex-col gap-2 text-sm text-slate-500">
          <label className="text-sm font-medium text-slate-700">Видео (файл)</label>
          <input
            type="file"
            accept="video/mp4,video/webm,video/*"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              try {
                const response = await uploadImage(file);
                setForm((prev) => ({ ...prev, videoUrl: response.url }));
                setStatus({ loading: false, error: '', success: 'Видео загружено.' });
              } catch (error) {
                setStatus({
                  loading: false,
                  error: error.response?.data?.error || 'Не удалось загрузить видео',
                  success: ''
                });
              }
            }}
          />
          {form.videoUrl && (
            <video className="w-full max-w-xs rounded-lg border border-slate-200" controls>
              <source src={resolveImageUrl(form.videoUrl)} />
            </video>
          )}
        </div>
          {form.imageUrls.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {form.imageUrls.map((url) => (
                <span
                  key={url}
                  className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
                >
                  <img
                    src={resolveImageUrl(url)}
                    alt="preview"
                    className="h-8 w-8 rounded-full object-cover"
                    onError={(event) => {
                      event.currentTarget.src = getFallbackImage();
                    }}
                  />
                  <span className="max-w-[180px] truncate">{url}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(url)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        {status.error && <p className="text-sm text-red-500">{status.error}</p>}
        {status.success && <p className="text-sm text-green-600">{status.success}</p>}
        <button
          type="submit"
          disabled={status.loading}
          className="w-full rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-70"
        >
          {status.loading ? 'Сохранение...' : 'Сохранить'}
        </button>
      </form>
    </div>
  );
}
