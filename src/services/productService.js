import apiClient from "@/lib/apiClient";
import { apiPaths } from "@/lib/productApi";
import { normalizeProductFromApi } from "@/lib/productUtils";

function unwrapData(response) {
  return response?.data?.data ?? null;
}

export async function fetchProducts() {
  try {
    const response = await apiClient.get(apiPaths.products.list);
    const products = unwrapData(response) ?? [];
    return products.map(normalizeProductFromApi);
  } catch (error) {
    console.error("fetchProducts failed:", error);
    return [];
  }
}

export async function fetchProductsWithMeta(params = {}) {
  const response = await apiClient.get(apiPaths.products.list, { params });
  const products = unwrapData(response) ?? [];

  return {
    products: products.map(normalizeProductFromApi),
    meta: response?.data?.meta ?? null,
  };
}

export async function fetchCategories() {
  const response = await apiClient.get(apiPaths.categories.list);
  return unwrapData(response) ?? [];
}

export async function fetchProductById(id) {
  try {
    const response = await apiClient.get(apiPaths.products.single(id));
    const data = unwrapData(response);
    return data ? normalizeProductFromApi(data) : null;
  } catch (error) {
    console.error(`fetchProductById failed for id ${id}:`, error);
    return null;
  }
}
