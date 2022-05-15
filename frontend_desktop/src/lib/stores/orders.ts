import { writable } from "svelte/store";
import type { Order } from "@src/types";

interface Store {
  orders: Order[];
}

const orderStore = writable<Store>({ orders: [] });

export const initOrders = (orders: Order[]) =>
  orderStore.update((state) => ({ ...state, orders: [...orders] }));

export default orderStore;
