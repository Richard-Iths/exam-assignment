import { IOrderArticle, IOrderRow } from '../types'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, BeforeUpdate } from 'typeorm'
import OrderRow from './orderRows'

@Entity('order_articles')
export default class OrderArticle implements IOrderArticle {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar' })
  description: string
  @Column({ type: 'numeric', precision: 9, scale: 3 })
  price: number
  @Column({ type: 'timestamptz', default: new Date(), name: 'created_at' })
  createdAt: Date
  @Column({ type: 'timestamptz', default: new Date(), name: 'updated_at' })
  updatedAt: Date
  @OneToMany(() => OrderRow, (row) => row.orderArt)
  orderRows: IOrderRow[]

  @BeforeUpdate()
  updateDate() {
    this.updatedAt = new Date()
  }
}
