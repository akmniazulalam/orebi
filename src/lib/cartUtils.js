import { getPrimaryVariant } from "@/lib/productUtils";

export function getCartLineId(item) {
  if (item?.cartLineId) {
    return item.cartLineId;
  }

  const productId = item?.productId || item?._id || item?.id;
  const variantId = item?.variantId;

  if (!productId) {
    return "";
  }

  return variantId ? `${productId}:${variantId}` : String(productId);
}

export function getCartLinePrice(item) {
  const price = item?.price ?? item?.variants?.[0]?.price;
  const numeric = Number(price);
  return Number.isNaN(numeric) ? 0 : numeric;
}

export function getCartLineImage(item) {
  return (
    item?.image ||
    item?.thumbnail ||
    item?.variants?.[0]?.images?.[0] ||
    ""
  );
}

export function getCartLineName(item) {
  return item?.name || item?.title || "Product";
}

export function buildCartLineItem(product, variant, quantity = 1) {
  const productId = product?._id || product?.id;
  const resolvedVariant = variant || getPrimaryVariant(product?.variants);
  const variantId = resolvedVariant?._id;

  return {
    cartLineId: variantId ? `${productId}:${variantId}` : String(productId),
    productId: String(productId),
    variantId: variantId ? String(variantId) : undefined,
    _id: productId,
    id: productId,
    name: product?.name || product?.title,
    title: product?.name || product?.title,
    price: Number(resolvedVariant?.price ?? product?.price ?? 0),
    image:
      resolvedVariant?.images?.[0] || product?.image || product?.thumbnail || "",
    color: resolvedVariant?.color,
    size: resolvedVariant?.size,
    ram: resolvedVariant?.ram,
    storage: resolvedVariant?.storage,
    badge: resolvedVariant?.badge,
    sku: resolvedVariant?.sku,
    quantity: Math.max(1, quantity),
  };
}

export function findVariantByOptions(variants = [], { color, size } = {}) {
  if (!variants.length) {
    return null;
  }

  const match = variants.find((variant) => {
    const colorMatch = !color || variant.color === color;
    const sizeMatch = !size || variant.size === size;
    return colorMatch && sizeMatch;
  });

  return match || variants[0];
}
