interface InventoryBadgeProps {
  status: string;
}

export default function InventoryBadge({ status }: InventoryBadgeProps) {
  const normalized = status.toLowerCase().replace(/[\s_-]+/g, '');

  let bgClass = 'bg-green-500/20 text-green-400 border-green-500/30';
  let label = status;

  if (normalized.includes('outofstock') || normalized.includes('unavailable')) {
    bgClass = 'bg-red-500/20 text-red-400 border-red-500/30';
    label = 'Out of Stock';
  } else if (normalized.includes('low') || normalized.includes('limited')) {
    bgClass = 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    label = 'Low Stock';
  } else if (normalized.includes('instock') || normalized.includes('available')) {
    bgClass = 'bg-green-500/20 text-green-400 border-green-500/30';
    label = 'In Stock';
  }

  return (
    <span
      className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full border ${bgClass}`}
    >
      {label}
    </span>
  );
}