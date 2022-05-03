import { writable } from "svelte/store";
import type { Order } from "@src/types";

interface Store {
  openOrders: Order[];
  orders: Order[];
}

const orderStore = writable<Store>({ openOrders: [], orders: [] });

export const toggleOrder = (newOrder: Order | number) =>
  orderStore.update((state) => {
    if (typeof newOrder === "number") {
      const filteredOrders = state.openOrders.filter(
        (order) => order.id !== newOrder
      );
      return {
        ...state,
        openOrders: [...filteredOrders],
      };
    }
    if (state.openOrders.some((order) => order.id === newOrder.id)) {
      return { ...state };
    }
    return { ...state, openOrders: [...state.openOrders, newOrder] };
  });

export const initOrders = (orders: Order[]) =>
  orderStore.update((state) => ({ ...state, orders: [...orders] }));

export default orderStore;
