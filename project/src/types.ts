export interface ServicePeriod {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
}

export interface IngredientCategory {
  id: string;
  name: string;
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  minThreshold: number;
  lastUpdated: string;
  consumedToday: number;
  expiryDate: string;
  cost: number;
  supplier: string;
  lotNumber: string;
}

export interface DishIngredient {
  ingredientId: string;
  quantity: number;
}

export interface Dish {
  id: string;
  name: string;
  ingredients: DishIngredient[];
  price: number;
  category: string;
  servingsToday: number;
  lastServed: string;
  costPerServing: number;
  profitMargin: number;
}

export interface ServiceRecord {
  id: string;
  date: string;
  periodId: string;
  dishId: string;
  quantity: number;
  revenue: number;
  cost: number;
  profit: number;
  ingredientsUsed: {
    ingredientId: string;
    quantity: number;
  }[];
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
}

export type InventoryContextType = {
  ingredients: Ingredient[];
  categories: IngredientCategory[];
  dishes: Dish[];
  servicePeriods: ServicePeriod[];
  serviceRecords: ServiceRecord[];
  suppliers: Supplier[];
  addIngredient: (ingredient: Omit<Ingredient, 'id' | 'lastUpdated' | 'consumedToday'>) => void;
  updateIngredient: (id: string, updates: Partial<Ingredient>) => void;
  deleteIngredient: (id: string) => void;
  addDish: (dish: Omit<Dish, 'id' | 'lastServed' | 'servingsToday'>) => void;
  updateDishServings: (id: string, periodId: string, servings: number) => void;
  deleteDish: (id: string) => void;
  addServicePeriod: (period: Omit<ServicePeriod, 'id'>) => void;
  deleteServicePeriod: (id: string) => void;
  resetDailyTracking: () => void;
  getCurrentPeriod: () => ServicePeriod | undefined;
  getExpiringIngredients: () => Ingredient[];
  getLowStockIngredients: () => Ingredient[];
  calculateRecipeCost: (dishId: string) => number;
};