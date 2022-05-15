import { writable } from "svelte/store";
import type { User } from "@src/types";

interface Store {
  users: User[];
}

const orderStore = writable<Store>({ users: [] });

export const initUsers = (users: User[]) =>
  orderStore.update((state) => ({ ...state, users: [...users] }));

export const getEmployees = orderStore.subscribe(({ users }) =>
  users.filter((u) => u.userRole === "Admin" || u.userRole === "Employee")
);

export const getCustomers = orderStore.subscribe(({ users }) =>
  users.filter((u) => u.userRole === "Customer")
);

export const getEmployee = (id: number) =>
  orderStore.subscribe(({ users }) => users.find((u) => u.id === id));

export default orderStore;
