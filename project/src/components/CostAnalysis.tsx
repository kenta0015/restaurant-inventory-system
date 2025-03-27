import React from 'react';
import { useInventory } from '../context/InventoryContext';
import { DollarSign, TrendingUp } from 'lucide-react';

export const CostAnalysis: React.FC = () => {
  const { dishes, calculateRecipeCost } = useInventory();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <DollarSign className="h-5 w-5 text-green-600 mr-2" />
        <h2 className="text-xl font-semibold">Cost Analysis</h2>
      </div>
      <div className="space-y-4">
        {dishes.map((dish) => {
          const cost = calculateRecipeCost(dish.id);
          const profit = dish.price - cost;
          const margin = ((profit / dish.price) * 100).toFixed(2);
          
          return (
            <div key={dish.id} className="border-b pb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{dish.name}</h3>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {margin}% margin
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Cost: </span>
                  <span className="font-medium">${cost.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-gray-600">Price: </span>
                  <span className="font-medium">${dish.price.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-gray-600">Profit: </span>
                  <span className="font-medium">${profit.toFixed(2)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};