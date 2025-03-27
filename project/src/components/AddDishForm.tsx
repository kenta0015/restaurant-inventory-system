import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { DishIngredient } from '../types';

export const AddDishForm: React.FC = () => {
  const { ingredients, addDish } = useInventory();
  const [name, setName] = useState('');
  const [dishIngredients, setDishIngredients] = useState<DishIngredient[]>([]);

  const handleAddIngredient = () => {
    setDishIngredients(prev => [
      ...prev,
      { ingredientId: ingredients[0]?.id || '', quantity: 0 }
    ]);
  };

  const handleRemoveIngredient = (index: number) => {
    setDishIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index: number, field: keyof DishIngredient, value: string | number) => {
    setDishIngredients(prev =>
      prev.map((ing, i) =>
        i === index ? { ...ing, [field]: value } : ing
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDish({ name, ingredients: dishIngredients });
    setName('');
    setDishIngredients([]);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Dish</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Dish Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Ingredients Required</h3>
            <button
              type="button"
              onClick={handleAddIngredient}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
            >
              <PlusCircle className="w-4 h-4 mr-1" />
              Add Ingredient
            </button>
          </div>

          {dishIngredients.map((ing, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-1">
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={ing.ingredientId}
                  onChange={(e) => handleIngredientChange(index, 'ingredientId', e.target.value)}
                >
                  <option value="">Select Ingredient</option>
                  {ingredients.map(ingredient => (
                    <option key={ingredient.id} value={ingredient.id}>
                      {ingredient.name} ({ingredient.unit})
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  placeholder="Quantity"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={ing.quantity}
                  onChange={(e) => handleIngredientChange(index, 'quantity', Number(e.target.value))}
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveIngredient(index)}
                className="text-red-600 hover:text-red-900"
              >
                <MinusCircle className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={dishIngredients.length === 0}
        className="mt-6 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
      >
        <PlusCircle className="w-4 h-4 mr-2" />
        Add Dish
      </button>
    </form>
  );
};