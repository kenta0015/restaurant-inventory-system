import React from 'react';
import { InventoryProvider } from './context/InventoryContext';
import { AddIngredientForm } from './components/AddIngredientForm';
import { InventoryList } from './components/InventoryList';
import { AddDishForm } from './components/AddDishForm';
import { DishList } from './components/DishList';
import { ServicePeriodStatus } from './components/ServicePeriodStatus';
import { ServiceSummary } from './components/ServiceSummary';
import { LowStockAlert } from './components/LowStockAlert';
import { ExpiryTracker } from './components/ExpiryTracker';
import { CostAnalysis } from './components/CostAnalysis';
import { Utensils } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <InventoryProvider>
      <div className="min-h-screen bg-gray-100">
        <Toaster />
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <Utensils className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">
                Restaurant Management System
              </h1>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <LowStockAlert />
            <ExpiryTracker />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <ServicePeriodStatus />
              <div className="lg:col-span-2">
                <ServiceSummary />
              </div>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AddIngredientForm />
                <AddDishForm />
              </div>
              <CostAnalysis />
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Daily Service Tracking</h2>
                <DishList />
              </div>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Inventory Status</h2>
                <InventoryList />
              </div>
            </div>
          </div>
        </main>
      </div>
    </InventoryProvider>
  );
}

export default App;