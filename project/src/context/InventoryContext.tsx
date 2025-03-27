import React, { createContext, useContext, useState, useEffect } from 'react';
import { format, isWithinInterval, parse } from 'date-fns';
import { 
  Ingredient, 
  IngredientCategory, 
  Dish, 
  ServicePeriod, 
  ServiceRecord,
  InventoryContextType 
} from '../types';

// Create a context for managing global inventory state
// undefined is the default value when accessing context outside provider
const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

// Default categories for ingredient classification
// These categories help organize ingredients in the system
const DEFAULT_CATEGORIES: IngredientCategory[] = [
  { id: '1', name: 'Vegetables' },
  { id: '2', name: 'Meat' },
  { id: '3', name: 'Dairy' },
  { id: '4', name: 'Dry Goods' },
  { id: '5', name: 'Spices' }
];

// Predefined service periods for the restaurant
// Each period has a specific time window for operations
const DEFAULT_SERVICE_PERIODS: ServicePeriod[] = [
  { id: '1', name: 'Breakfast', startTime: '06:00', endTime: '11:00' },
  { id: '2', name: 'Lunch', startTime: '11:00', endTime: '15:00' },
  { id: '3', name: 'Dinner', startTime: '17:00', endTime: '23:00' }
];

/**
 * InventoryProvider Component
 * 
 * Main context provider that manages the global state for the restaurant management system.
 * Handles inventory, dishes, service periods, and records.
 * Implements local storage persistence for data retention between sessions.
 */
export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State for ingredients with local storage persistence
  // Tracks all ingredient details including stock levels and consumption
 const [ingredients, setIngredients] = useState<Ingredient[]>(() => {
  try {
    const saved = localStorage.getItem('ingredients');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to parse ingredients from localStorage:', error);
    return [];
  }
});


  // Static categories and service periods
  // These remain constant throughout the application lifecycle
  const [categories] = useState<IngredientCategory[]>(DEFAULT_CATEGORIES);
  const [servicePeriods, setServicePeriods] = useState<ServicePeriod[]>(DEFAULT_SERVICE_PERIODS);



  // State for dishes with local storage persistence
  // Manages all dish recipes and their current service status
 const [dishes, setDishes] = useState<Dish[]>(() => {
  try {
    const saved = localStorage.getItem('dishes');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to parse dishes from localStorage:', error);
    return [];
  }
});


  // State for service records with local storage persistence
  // Tracks all service transactions and revenue data
  const [serviceRecords, setServiceRecords] = useState<ServiceRecord[]>(() => {
  try {
    const saved = localStorage.getItem('serviceRecords');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to parse serviceRecords from localStorage:', error);
    return [];
  }
});


  // Effect hooks for persisting state changes to local storage
  useEffect(() => {
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
  }, [ingredients]);

  useEffect(() => {
    localStorage.setItem('dishes', JSON.stringify(dishes));
  }, [dishes]);

  useEffect(() => {
    localStorage.setItem('serviceRecords', JSON.stringify(serviceRecords));
  }, [serviceRecords]);

  /**
   * Gets the current service period based on the time of day
   * Returns undefined if no service period is active
   */
  const getCurrentPeriod = () => {
    const now = new Date();
    const currentTime = format(now, 'HH:mm');
    
    return servicePeriods.find(period => {
      const start = parse(period.startTime, 'HH:mm', new Date());
      const end = parse(period.endTime, 'HH:mm', new Date());
      const current = parse(currentTime, 'HH:mm', new Date());
      
      return isWithinInterval(current, { start, end });
    });
  };

  /**
   * Adds a new ingredient to the inventory
   * Generates a unique ID and sets initial values for tracking fields
   */
  const addIngredient = (ingredient: Omit<Ingredient, 'id' | 'lastUpdated' | 'consumedToday'>) => {
    const newIngredient: Ingredient = {
      ...ingredient,
      id: crypto.randomUUID(),
      lastUpdated: new Date().toISOString(),
      consumedToday: 0
    };
    setIngredients(prev => [...prev, newIngredient]);
  };

  /**
   * Updates the quantity of an existing ingredient
   * Also updates the last modified timestamp
   */
  const updateIngredient = (id: string, quantity: number) => {
    setIngredients(prev =>
      prev.map(ing =>
        ing.id === id
          ? { 
              ...ing, 
              quantity,
              lastUpdated: new Date().toISOString()
            }
          : ing
      )
    );
  };

  /**
   * Removes an ingredient from the inventory
   * Should be used with caution as it affects linked dishes
   */
  const deleteIngredient = (id: string) => {
    setIngredients(prev => prev.filter(ing => ing.id !== id));
  };

  /**
   * Adds a new dish to the menu
   * Initializes tracking metrics for the dish
   */
  const addDish = (dish: Omit<Dish, 'id' | 'lastServed' | 'servingsToday'>) => {
    const newDish: Dish = {
      ...dish,
      id: crypto.randomUUID(),
      lastServed: new Date().toISOString(),
      servingsToday: 0
    };
    setDishes(prev => [...prev, newDish]);
  };

  /**
   * Updates the number of servings for a dish
   * Handles ingredient consumption and service record creation
   * Updates stock levels and generates revenue data
   */
  const updateDishServings = (dishId: string, periodId: string, servings: number) => {
    const dish = dishes.find(d => d.id === dishId);
    if (!dish) return;

    // Update dish servings count and last served timestamp
    setDishes(prev =>
      prev.map(d =>
        d.id === dishId
          ? {
              ...d,
              servingsToday: d.servingsToday + servings,
              lastServed: new Date().toISOString()
            }
          : d
      )
    );

    // Create service record for revenue tracking
const newRecord: ServiceRecord = {
  id: crypto.randomUUID(),
  date: new Date().toISOString(),
  periodId,
  dishId,
  quantity: servings,
  revenue: dish.price * servings,
  ingredientsUsed: (dish.ingredients ?? []).map(ing => ({
    ingredientId: ing.ingredientId,
    quantity: ing.quantity * servings
  }))
};
setServiceRecords(prev => [...prev, newRecord]);

    // Update ingredient quantities and consumption tracking
    dish.ingredients.forEach(({ ingredientId, quantity }) => {
      const ingredient = ingredients.find(i => i.id === ingredientId);
      if (ingredient) {
        const consumedQuantity = quantity * servings;
        setIngredients(prev =>
          prev.map(ing =>
            ing.id === ingredientId
              ? {
                  ...ing,
                  quantity: Math.max(0, ing.quantity - consumedQuantity),
                  consumedToday: ing.consumedToday + consumedQuantity,
                  lastUpdated: new Date().toISOString()
                }
              : ing
          )
        );
      }
    });
  };

  /**
   * Removes a dish from the menu
   * Should be used with caution as it affects service records
   */
  const deleteDish = (id: string) => {
    setDishes(prev => prev.filter(dish => dish.id !== id));
  };

  /**
   * Adds a new service period to the schedule
   * Generates a unique ID for the period
   */
  const addServicePeriod = (period: Omit<ServicePeriod, 'id'>) => {
    const newPeriod: ServicePeriod = {
      ...period,
      id: crypto.randomUUID()
    };
    setServicePeriods(prev => [...prev, newPeriod]);
  };

  /**
   * Removes a service period from the schedule
   */
  const deleteServicePeriod = (id: string) => {
    setServicePeriods(prev => prev.filter(period => period.id !== id));
  };

  /**
   * Resets daily tracking metrics
   * Called at the end of each business day
   * Zeroes out servings count and consumption data
   */
  const resetDailyTracking = () => {
    setDishes(prev =>
      prev.map(dish => ({
        ...dish,
        servingsToday: 0
      }))
    );
    setIngredients(prev =>
      prev.map(ing => ({
        ...ing,
        consumedToday: 0
      }))
    );
  };

  // Provide the context value to child components
  return (
    <InventoryContext.Provider value={{
      ingredients,
      categories,
      dishes,
      servicePeriods,
      serviceRecords,
      addIngredient,
      updateIngredient,
      deleteIngredient,
      addDish,
      updateDishServings,
      deleteDish,
      addServicePeriod,
      deleteServicePeriod,
      resetDailyTracking,
      getCurrentPeriod
    }}>
      {children}
    </InventoryContext.Provider>
  );
};

/**
 * Custom hook for accessing the inventory context
 * Throws an error if used outside of InventoryProvider
 */
export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
