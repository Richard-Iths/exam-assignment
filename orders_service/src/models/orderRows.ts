import { IOrderArticle, IOrderRow } from '../types'
import { BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Order, OrderArticle } from '.'

@Entity('order_rows')
export default class OrderRow implements IOrderRow {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ name: 'order_id' })
  @ManyToOne(() => Order, (order) => order.id)
  orderId: Order
  @Column({ name: 'order_art_id' })
  @ManyToOne(() => OrderArticle, (article) => article.id)
  orderArtId: IOrderArticle
  @Column({ type: 'int' })
  amount: number
  @Column({ type: 'datetime', default: new Date(), name: 'created_at' })
  createdAt: Date
  @Column({ type: 'datetime', default: new Date(), name: 'updated_at' })
  updatedAt: Date

  @BeforeUpdate()
  updateDate() {
    this.updatedAt = new Date()
  }
}
