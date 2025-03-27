import React from 'react';
import { useInventory } from '../context/InventoryContext';
import { BarChart3, TrendingUp } from 'lucide-react';

export const ServiceSummary: React.FC = () => {
  const { serviceRecords, dishes, ingredients } = useInventory();
  
  // Get today's records
  const today = new Date().toISOString().split('T')[0];
  const todayRecords = serviceRecords.filter(record => 
    record.date.startsWith(today)
  );

  const totalRevenue = todayRecords.reduce((sum, record) => sum + record.revenue, 0);
  
  const topDishes = dishes
    .map(dish => ({
      name: dish.name,
      servings: dish.servingsToday
    }))
    .sort((a, b) => b.servings - a.servings)
    .slice(0, 5);

  const topConsumed = ingredients
    .map(ing => ({
      name: ing.name,
      consumed: ing.consumedToday,
      unit: ing.unit
    }))
    .sort((a, b) => b.consumed - a.consumed)
    .slice(0, 5);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Today's Summary</h2>
        </div>
        <div className="text-2xl font-bold text-green-600">
          ${totalRevenue.toFixed(2)}
        </div>
      </div>

      <div>
        <div className="flex items-center space-x-2 mb-3">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-medium">Top Dishes Served</h3>
        </div>
        <ul className="space-y-2">
          {topDishes.map(dish => (
            <li key={dish.name} className="flex justify-between items-center">
              <span className="text-gray-700">{dish.name}</span>
              <span className="font-medium">{dish.servings}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Most Used Ingredients</h3>
        <ul className="space-y-2">
          {topConsumed.map(ing => (
            <li key={ing.name} className="flex justify-between items-center">
              <span className="text-gray-700">{ing.name}</span>
              <span className="font-medium">
                {ing.consumed} {ing.unit}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};