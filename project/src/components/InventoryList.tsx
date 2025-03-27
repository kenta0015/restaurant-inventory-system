import React from 'react';
import { useInventory } from '../context/InventoryContext';
import { Trash2, AlertCircle, Plus, Minus } from 'lucide-react';

export const InventoryList: React.FC = () => {
  const { ingredients, categories, updateIngredient, deleteIngredient } = useInventory();

  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || 'Uncategorized';
  };

  const isLowStock = (ingredient: typeof ingredients[0]) => {
    return ingredient.quantity <= ingredient.minThreshold;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ingredients.map((ingredient) => (
              <tr key={ingredient.id} className={isLowStock(ingredient) ? 'bg-red-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">
                      {ingredient.name}
                      {isLowStock(ingredient) && (
                        <AlertCircle className="inline-block w-4 h-4 ml-2 text-red-500" />
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{getCategoryName(ingredient.category)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateIngredient(ingredient.id, ingredient.quantity - 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                      disabled={ingredient.quantity <= 0}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm text-gray-900">
                      {ingredient.quantity} {ingredient.unit}
                    </span>
                    <button
                      onClick={() => updateIngredient(ingredient.id, ingredient.quantity + 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(ingredient.lastUpdated).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => deleteIngredient(ingredient.id)}
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