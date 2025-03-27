import React from 'react';
import { useInventory } from '../context/InventoryContext';
import { Clock } from 'lucide-react';
import { format, parseISO, differenceInDays } from 'date-fns';

export const ExpiryTracker: React.FC = () => {
  const { getExpiringIngredients } = useInventory();
  const expiringItems = getExpiringIngredients();

  if (expiringItems.length === 0) return null;

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <div className="flex items-center">
        <Clock className="h-5 w-5 text-yellow-400 mr-2" />
        <h3 className="text-yellow-800 font-medium">Expiring Ingredients</h3>
      </div>
      <div className="mt-2">
        <ul className="list-disc list-inside space-y-1">
          {expiringItems.map((item) => {
            const daysUntilExpiry = differenceInDays(parseISO(item.expiryDate), new Date());
            return (
              <li key={item.id} className="text-yellow-700">
                {item.name} - Expires: {format(parseISO(item.expiryDate), 'MMM dd, yyyy')} ({daysUntilExpiry} days left)
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};