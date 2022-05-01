import log from '../utils/logger'
import { DataSource } from 'typeorm'
import { Order, OrderArticle, OrderRow } from '../models'

export const initDataSource = async () => {
  try {
    log.info('db/ordersService', 'initializing orders service database')
    return await new DataSource({
      type: 'postgres',
      host: process.env.PGHOST ?? 'localhost',
      port: Number(process.env.PGPORT) ?? 5432,
      username: process.env.PGUSER ?? 'postgres',
      password: process.env.PGPASSWORD ?? 'example',
      database: process.env.PGDATABASE ?? 'postgres',
      entities: [Order, OrderRow, OrderArticle],
      synchronize: false,
    }).initialize()
  } catch (err) {
    log.error('db/ordersService', 'failed to initialize data source', err)
  }
}
