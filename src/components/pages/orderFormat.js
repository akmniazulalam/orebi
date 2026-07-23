export function formatMoney(value, currency = "USD") {
  const amount = Number(value) || 0;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatDate(value) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function getStatusBadgeClass(status) {
  switch (status) {
    case "Processing":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "Shipped":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "Delivered":
      return "bg-green-50 text-green-700 border-green-200";
    case "Cancelled":
      return "bg-red-50 text-red-700 border-red-200";
    case "Pending":
    default:
      return "bg-amber-50 text-amber-700 border-amber-200";
  }
}

export function getItemCount(order) {
  const items = Array.isArray(order?.items) ? order.items : [];

  return items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
}
