import { writable } from "svelte/store";
import type { Order } from "@src/types";

interface Store {
  openOrders: Order[];
}

const orderStore = writable<Store>({ openOrders: [] });

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

export default orderStore;
