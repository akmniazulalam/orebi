/**
 * Normalizes API products (with variants[]) and legacy mock products for display.
 */
export function getPrimaryVariant(variants = []) {
  if (!variants?.length) {
    return null;
  }

  const inStock = variants.find((variant) => Number(variant.stock) > 0);
  return inStock || variants[0];
}

export function getBadgeVariant(variants = []) {
  if (!variants?.length) {
    return null;
  }

  return variants.find((variant) => variant.badge) || variants[0];
}

export function formatVariantPrice(variants = []) {
  const prices = variants
    .map((variant) => Number(variant.price))
    .filter((price) => !Number.isNaN(price));

  if (!prices.length) {
    return "$0.00";
  }

  const min = Math.min(...prices);
  const max = Math.max(...prices);

  if (min === max) {
    return `$${min.toFixed(2)}`;
  }

  return `$${min.toFixed(2)} – $${max.toFixed(2)}`;
}

export function getUniqueVariantColors(variants = []) {
  const seen = new Set();

  return variants
    .map((variant) => variant.color?.trim())
    .filter((color) => {
      if (!color || seen.has(color.toLowerCase())) {
        return false;
      }
      seen.add(color.toLowerCase());
      return true;
    });
}

export function getUniqueVariantSizes(variants = [], limit = 4) {
  const seen = new Set();
  const allSizes = [];

  for (const variant of variants) {
    const size = variant.size?.trim();
    if (!size || seen.has(size.toLowerCase())) {
      continue;
    }
    seen.add(size.toLowerCase());
    allSizes.push(size);
  }

  return {
    sizes: allSizes.slice(0, limit),
    hasMore: allSizes.length > limit,
  };
}

export function normalizeProductFromApi(product) {
  if (!product) {
    return null;
  }

  return {
    ...product,
    variants: (product.variants ?? []).map((variant) => ({
      ...variant,
      images: variant.images ?? [],
    })),
  };
}

export function normalizeProductForDisplay(product) {
  const variants = product.variants ?? [];
  const hasApiVariants = variants.length > 0;
  const primary = getPrimaryVariant(variants);
  const badgeSource = getBadgeVariant(variants);

  if (hasApiVariants) {
    return {
      ...product,
      id: product._id || product.id,
      name: product.name || product.title,
      image: primary?.images?.[0] || product.image,
      price: formatVariantPrice(variants),
      badge: badgeSource?.badge,
      color: primary?.color,
      variants,
      hasVariants: true,
      variantCount: variants.length,
      detailPath: product._id ? `/productdetails/${product._id}` : null,
    };
  }

  const legacyPrice =
    typeof product.price === "number"
      ? `$${product.price.toFixed(2)}`
      : product.price || "$44.00";

  return {
    ...product,
    id: product.id || product._id,
    name: product.name || product.title,
    image: product.image || product.thumbnail,
    price: legacyPrice,
    badge: product.badge || product.badgeT,
    color: product.color,
    variants: [],
    hasVariants: false,
    variantCount: 0,
    detailPath: product._id ? `/productdetails/${product._id}` : null,
  };
}
