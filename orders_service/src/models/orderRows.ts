import { IOrder, IOrderArticle, IOrderRow } from '../types'
import { BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import Order from './orders'
import OrderArticle from './orderArticles'

@Entity('order_rows')
export default class OrderRow implements IOrderRow {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'int', name: 'order_id' })
  orderId: number
  @Column({ type: 'int', name: 'order_art_id' })
  orderArtId: number
  @Column({ type: 'numeric', precision: 9, scale: 3 })
  amount: number
  @Column({ type: 'timestamptz', default: new Date(), name: 'created_at' })
  createdAt: Date
  @Column({ type: 'timestamptz', default: new Date(), name: 'updated_at' })
  updatedAt: Date

  @ManyToOne(() => Order, (order) => order.orderRows)
  @JoinColumn({ name: 'order_id' })
  order: Order

  @JoinColumn({ name: 'order_art_id' })
  @ManyToOne(() => OrderArticle, (article) => article.orderRows)
  orderArt: IOrderArticle

  @BeforeUpdate()
  updateDate() {
    this.updatedAt = new Date()
  }
}
