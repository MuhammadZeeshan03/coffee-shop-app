import { produce } from 'immer';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';

export const useStore = create(
  persist(
    (set, get) => ({
      CoffeeList: CoffeeData,
      BeansList: BeansData,
      CartPrice: 0,
      favoritesList: [],
      cartList: [],
      OrderHistoryList: [],

    }), { name: 'coffee-app', storage: createJSONStorage(() => AsyncStorage) }
  )
);