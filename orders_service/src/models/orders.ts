import { IOrder, OrderStatus } from '../types'
import { BeforeUpdate, Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import OrderRow from './orderRows'

@Entity('orders')
export default class Order implements IOrder {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'int', unique: true, name: 'order_numb' })
  orderNumb: number
  @Column({ type: 'int', name: 'emp_ref' })
  empRef: number
  @Column({ type: 'int', name: 'customer_ref' })
  customerRef: number
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus
  @Column({ type: 'timestamptz', default: new Date(), name: 'created_at' })
  createdAt: Date
  @Column({ type: 'timestamptz', default: new Date(), name: 'updated_at' })
  updatedAt: Date

  @OneToMany(() => OrderRow, (row) => row.order)
  @JoinTable({ name: 'order_rows' })
  orderRows: OrderRow[]

  @BeforeUpdate()
  updateDate() {
    this.updatedAt = new Date()
  }
}
