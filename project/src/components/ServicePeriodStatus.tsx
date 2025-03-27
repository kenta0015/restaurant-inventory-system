import React from 'react';
import { useInventory } from '../context/InventoryContext';
import { Clock } from 'lucide-react';

export const ServicePeriodStatus: React.FC = () => {
  const { getCurrentPeriod } = useInventory();
  const currentPeriod = getCurrentPeriod();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center space-x-2">
        <Clock className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Current Service Period</h2>
      </div>
      <div className="mt-2">
        {currentPeriod ? (
          <div className="text-green-600 font-medium">
            {currentPeriod.name} ({currentPeriod.startTime} - {currentPeriod.endTime})
          </div>
        ) : (
          <div className="text-gray-500">No active service period</div>
        )}
      </div>
    </div>
  );
};