import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'

export enum OrderStatus {
  PENDING = 'pending',
  PENDING_INVOICE = 'pending_invoice',
  COMPLETE = 'complete',
}
export interface IOrder {
  id: number
  orderNumb: number
  customerRef: number
  empRef: number
  status: OrderStatus
  createdAt: Date
  updatedAt: Date
  orderRows: IOrderRow[]
}

export interface IOrderRow {
  id: number
  orderId: number
  orderArtId: number
  amount: number
  createdAt: Date
  updatedAt: Date
  orderArt: IOrderArticle
}

export interface IOrderArticle {
  id: number
  description: string
  price: number
  createdAt: Date
  updatedAt: Date
  orderRows: IOrderRow[]
}

export type UserRole = 'admin' | 'customer' | 'employee'

export interface JwtUserPayload extends JwtPayload {
  id: number
  role: UserRole
}

export interface RequestWithExtra extends Request {
  user?: JwtUserPayload
}
export interface IBaseDto {}
