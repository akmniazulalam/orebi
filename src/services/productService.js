import apiClient from "@/lib/apiClient";
import { apiPaths } from "@/lib/productApi";
import { normalizeProductFromApi } from "@/lib/productUtils";

function unwrapData(response) {
  return response?.data?.data ?? null;
}

export async function fetchProducts() {
  const response = await apiClient.get(apiPaths.products.list);
  const products = unwrapData(response) ?? [];
  return products.map(normalizeProductFromApi);
}

export async function fetchProductById(id) {
  const response = await apiClient.get(apiPaths.products.single(id));
  return normalizeProductFromApi(unwrapData(response));
}
