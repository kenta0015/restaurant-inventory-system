import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { PlusCircle } from 'lucide-react';

export const AddIngredientForm: React.FC = () => {
  const { categories, addIngredient } = useInventory();
  const [formData, setFormData] = useState({
    name: '',
    quantity: 0,
    unit: '',
    category: categories[0]?.id || '',
    minThreshold: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addIngredient(formData);
    setFormData({
      name: '',
      quantity: 0,
      unit: '',
      category: categories[0]?.id || '',
      minThreshold: 0
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Ingredient</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.quantity}
            onChange={(e) => setFormData(prev => ({ ...prev, quantity: Number(e.target.value) }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Unit</label>
          <input
            type="text"
            required
            placeholder="kg, liters, pieces..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.unit}
            onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Minimum Threshold</label>
          <input
            type="number"
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.minThreshold}
            onChange={(e) => setFormData(prev => ({ ...prev, minThreshold: Number(e.target.value) }))}
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusCircle className="w-4 h-4 mr-2" />
        Add Ingredient
      </button>
    </form>
  );
};