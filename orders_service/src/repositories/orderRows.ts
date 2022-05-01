import { initDataSource } from '../db/ordersService'
import log from '../utils/logger'
import { Repository } from 'typeorm'
import { OrderRow } from '../models'

const initOrderRowsRepository = async (): Promise<Repository<OrderRow>> => {
  try {
    const ds = await initDataSource()
    if (!ds) {
      throw new Error('data source is undefined')
    }
    return ds.getRepository(OrderRow)
  } catch (err) {
    log.error('repositories/orderRows', 'failed to initialize repository', err)
    throw err
  }
}

export default initOrderRowsRepository
