export enum TauriCommands {
  INIT_APPLICATION_CONFIG = "init_application_config",
  ADD_APPLICATION_CONFIG = "add_application_config",
}

export type AppStates = "initialized" | "uninitialized" | "pending";
export interface AppContext {
  appState: AppStates;
}
export enum AppContextKeys {
  STATE = "state",
}

export interface HostConfig {
  port: number;
  address: String;
}
export interface AppConfig {
  host: HostConfig;
}

export enum AppRoutes {
  HOME = "/",
  ORDERS = "/orders",
  INVOICES = "/invoices",
  USERS = "/users",
}
export enum Statues {
  PENDING,
  IN_PROGRESS,
  INVOICE,
  INVOICED,
}
export type OrderStatues = Statues.PENDING | Statues.IN_PROGRESS;

export const OrderStatusesMapping: Record<OrderStatues, string> = {
  "0": "pending",
  "1": "in progress",
};
export interface Order {
  id: number;
  orderNo: number;
  description: string;
  customerRef?: string;
  employeeRef?: string;
  status: string;
}
export const OrderFormMapping: Record<keyof Omit<Order, "id">, string> = {
  orderNo: "order no",
  description: "description",
  customerRef: "customer ref",
  employeeRef: "employee ref",
  status: "status",
};
export interface OrderRow {
  id: number;
  art: string;
  description: string;
  price: number;
  amount: number;
  total: number;
  inStock: boolean;
}

export const OrderRowMapping: Record<keyof Omit<OrderRow, "id">, string> = {
  art: "art",
  amount: "amount",
  description: "description",
  inStock: "in stock",
  price: "price",
  total: "total",
};

export enum UserRoles {
  ADMIN = "admin",
  CUSTOMER = "customer",
  EMPLOYEE = "employee",
}

export interface User {
  id: number;
  username: string;
  active: boolean;
  userRole: string;
  createdAt: string;
  updatedAt: string;
}

export const UserFormMapping: Record<keyof Omit<User, "id">, string> = {
  username: "username",
  userRole: "role",
  active: "active",
  createdAt: "created",
  updatedAt: "last updated",
};
