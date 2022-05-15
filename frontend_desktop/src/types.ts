export enum TauriCommands {
  INIT_APPLICATION_CONFIG = "init_application_config",
  ADD_APPLICATION_CONFIG = "add_application_config",
  IS_AUTHENTICATED = "is_authenticated",
  AUTHENTICATE_USER = "authenticate_user",
  GET_ORDERS = "get_orders",
  GET_USERS = "get_users",
}

export type AppState =
  | "pending"
  | "initialized"
  | "uninitialized"
  | "unauthorized"
  | "authorized";
export interface AppContext {
  appState: AppState;
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
export enum OrderStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETE = "complete",
}

export interface OrderArt {
  id: number;
  description: string;
  price: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: number;
  orderNumb: number;
  description: string;
  customerRef?: number;
  empRef?: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  orderRows: OrderRow[];
}

export interface OrderRow {
  id: number;
  orderArtId: number;
  orderId: number;
  amount: number;
  total: number;
  // inStock: boolean;
  orderArt: OrderArt;
}

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

export enum KeyboardShortCut {
  ESCAPE = "Escape",
  OPEN_ORDER = "ctrl+o",
}
