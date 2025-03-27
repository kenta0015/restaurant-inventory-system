import React from 'react';
import { useInventory } from '../context/InventoryContext';
import { AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

export const LowStockAlert: React.FC = () => {
  const { getLowStockIngredients } = useInventory();
  const lowStockItems = getLowStockIngredients();

  React.useEffect(() => {
    if (lowStockItems.length > 0) {
      toast.error(`${lowStockItems.length} ingredients are running low!`, {
        duration: 5000,
        position: 'top-right',
      });
    }
  }, [lowStockItems.length]);

  if (lowStockItems.length === 0) return null;

  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
      <div className="flex items-center">
        <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
        <h3 className="text-red-800 font-medium">Low Stock Alert</h3>
      </div>
      <div className="mt-2">
        <ul className="list-disc list-inside space-y-1">
          {lowStockItems.map((item) => (
            <li key={item.id} className="text-red-700">
              {item.name} - Current: {item.quantity} {item.unit} (Min: {item.minThreshold} {item.unit})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};