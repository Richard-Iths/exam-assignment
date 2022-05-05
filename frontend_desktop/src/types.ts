export enum TauriCommands {
  INIT_APPLICATION_CONFIG = "init_application_config",
  ADD_APPLICATION_CONFIG = "add_application_config",
  IS_AUTHENTICATED = "is_authenticated",
  AUTHENTICATE_USER = "authenticate_user",
  GET_ORDERS = "get_orders",
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
  IN_PROGRESS = "inProgress",
}

export interface Order {
  id: number;
  orderNumb: number;
  description: string;
  customerRef?: string;
  empRef?: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}
export const OrderFormMapping: Record<
  keyof Omit<Order, "id" | "createdAt">,
  string
> = {
  orderNumb: "order number",
  description: "description",
  customerRef: "customer ref",
  empRef: "employee ref",
  status: "status",
  updatedAt: "updated",
};
export const OrderCreateFormMapping: Record<
  keyof Pick<Order, "empRef" | "customerRef" | "status" | "description">,
  string
> = {
  description: "description",
  status: "status",
  customerRef: "customer ref",
  empRef: "employee ref",
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
