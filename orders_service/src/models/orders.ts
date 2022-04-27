import { IOrder, OrderStatus } from '../types'
import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('orders')
export default class Order implements IOrder {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'int', unique: true, name: 'order_numb', select: true })
  orderNumb: number
  @Column({ type: 'int', name: 'emp_ref', select: true })
  empRef: number
  @Column({ type: 'int', name: 'customer_ref', select: true })
  customerRef: number
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus
  @Column({ type: 'timestamp', default: new Date(), name: 'created_at' })
  createdAt: Date
  @Column({ type: 'timestamp', default: new Date(), name: 'updated_at' })
  updatedAt: Date

  @BeforeUpdate()
  updateDate() {
    this.updatedAt = new Date()
  }
}
