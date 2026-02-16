// backend/src/controllers/kitchenController.js

import prisma from '../lib/prisma.js';

const normalizeKitchen = (kitchen) => ({
  ...kitchen,
  materials: kitchen.materials?.map((entry) => entry.material) || [],
  facades: kitchen.facades?.map((entry) => entry.facade) || []
});

export const listKitchens = async (req, res, next) => {
  try {
    const { categoryId } = req.query;
    const kitchens = await prisma.kitchen.findMany({
      where: categoryId ? { categoryId: Number(categoryId) } : undefined,
      include: {
        category: true,
        images: true,
        materials: { include: { material: true } },
        facades: { include: { facade: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    return res.json(kitchens.map(normalizeKitchen));
  } catch (error) {
    return next(error);
  }
};

export const getKitchen = async (req, res, next) => {
  try {
    const kitchenId = Number(req.params.id);
    const kitchen = await prisma.kitchen.findUnique({
      where: { id: kitchenId },
      include: {
        category: true,
        images: true,
        materials: { include: { material: true } },
        facades: { include: { facade: true } }
      }
    });

    if (!kitchen) {
      return res.status(404).json({ error: 'Kitchen not found' });
    }

    return res.json(normalizeKitchen(kitchen));
  } catch (error) {
    return next(error);
  }
};

export const createKitchen = async (req, res, next) => {
  try {
    const {
      name,
      description,
      priceFrom,
      priceOriginal,
      priceDiscount,
      discountPercent,
      videoUrl,
      instagramUrl,
      categoryId,
      materialIds,
      facadeIds,
      imageUrls
    } = req.body;
    const kitchen = await prisma.kitchen.create({
      data: {
        name,
        description,
        priceFrom: priceFrom ? Number(priceFrom) : null,
        priceOriginal: priceOriginal ? Number(priceOriginal) : null,
        priceDiscount: priceDiscount ? Number(priceDiscount) : null,
        discountPercent: discountPercent ? Number(discountPercent) : null,
        videoUrl: videoUrl || null,
        instagramUrl: instagramUrl || null,
        categoryId: categoryId ? Number(categoryId) : null,
        images: imageUrls?.length
          ? { create: imageUrls.map((url) => ({ url })) }
          : undefined,
        materials: materialIds?.length
          ? { create: materialIds.map((id) => ({ materialId: Number(id) })) }
          : undefined,
        facades: facadeIds?.length
          ? { create: facadeIds.map((id) => ({ facadeId: Number(id) })) }
          : undefined
      },
      include: {
        category: true,
        images: true,
        materials: { include: { material: true } },
        facades: { include: { facade: true } }
      }
    });

    return res.status(201).json(normalizeKitchen(kitchen));
  } catch (error) {
    return next(error);
  }
};

export const updateKitchen = async (req, res, next) => {
  try {
    const kitchenId = Number(req.params.id);
    const {
      name,
      description,
      priceFrom,
      priceOriginal,
      priceDiscount,
      discountPercent,
      videoUrl,
      instagramUrl,
      categoryId,
      materialIds,
      facadeIds,
      imageUrls
    } = req.body;

    await prisma.kitchen.update({
      where: { id: kitchenId },
      data: {
        name,
        description,
        priceFrom: priceFrom ? Number(priceFrom) : null,
        priceOriginal: priceOriginal ? Number(priceOriginal) : null,
        priceDiscount: priceDiscount ? Number(priceDiscount) : null,
        discountPercent: discountPercent ? Number(discountPercent) : null,
        videoUrl: videoUrl || null,
        instagramUrl: instagramUrl || null,
        categoryId: categoryId ? Number(categoryId) : null
      }
    });

    if (Array.isArray(materialIds)) {
      await prisma.kitchenMaterial.deleteMany({ where: { kitchenId } });
      if (materialIds.length) {
        await prisma.kitchenMaterial.createMany({
          data: materialIds.map((id) => ({ kitchenId, materialId: Number(id) }))
        });
      }
    }

    if (Array.isArray(facadeIds)) {
      await prisma.kitchenFacade.deleteMany({ where: { kitchenId } });
      if (facadeIds.length) {
        await prisma.kitchenFacade.createMany({
          data: facadeIds.map((id) => ({ kitchenId, facadeId: Number(id) }))
        });
      }
    }

    if (Array.isArray(imageUrls)) {
      await prisma.kitchenImage.deleteMany({ where: { kitchenId } });
      if (imageUrls.length) {
        await prisma.kitchenImage.createMany({
          data: imageUrls.map((url) => ({ kitchenId, url }))
        });
      }
    }

    const updated = await prisma.kitchen.findUnique({
      where: { id: kitchenId },
      include: {
        category: true,
        images: true,
        materials: { include: { material: true } },
        facades: { include: { facade: true } }
      }
    });

    return res.json(normalizeKitchen(updated));
  } catch (error) {
    return next(error);
  }
};

export const deleteKitchen = async (req, res, next) => {
  try {
    const kitchenId = Number(req.params.id);
    await prisma.kitchen.delete({ where: { id: kitchenId } });
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};
