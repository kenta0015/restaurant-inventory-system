import React from 'react';
import { useInventory } from '../context/InventoryContext';
import { Trash2, Plus, Minus } from 'lucide-react';

export const DishList: React.FC = () => {
  const { dishes, ingredients, updateDishServings, deleteDish } = useInventory();

  const getIngredientName = (id: string) => {
    return ingredients.find(ing => ing.id === id)?.name || 'Unknown';
  };

  const getIngredientUnit = (id: string) => {
    return ingredients.find(ing => ing.id === id)?.unit || '';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dish Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ingredients Required</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servings Today</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Served</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dishes.map((dish) => (
              <tr key={dish.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{dish.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    <ul className="list-disc list-inside">
                      {dish.ingredients.map((ing, index) => (
                        <li key={index}>
                          {getIngredientName(ing.ingredientId)}: {ing.quantity} {getIngredientUnit(ing.ingredientId)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateDishServings(dish.id, -1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                      disabled={dish.servingsToday <= 0}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm text-gray-900">
                      {dish.servingsToday}
                    </span>
                    <button
                      onClick={() => updateDishServings(dish.id, 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(dish.lastServed).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => deleteDish(dish.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};