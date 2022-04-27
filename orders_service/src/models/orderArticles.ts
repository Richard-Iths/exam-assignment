import { IOrderArticle } from '../types'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, BeforeUpdate } from 'typeorm'
import OrderRow from './orderRows'

@Entity('order_articles')
export default class OrderArticle implements IOrderArticle {
  @PrimaryGeneratedColumn()
  @OneToMany(() => OrderRow, (row) => row.orderArtId)
  id: number
  @Column({ type: 'varchar' })
  description: string
  @Column({ type: 'numeric', precision: 3 })
  price: number
  @Column({ type: 'datetime', default: new Date(), name: 'created_at' })
  createdAt: Date
  @Column({ type: 'datetime', default: new Date(), name: 'updated_at' })
  updatedAt: Date

  @BeforeUpdate()
  updateDate() {
    this.updatedAt = new Date()
  }
}
