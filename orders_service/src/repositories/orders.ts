import Order from '../models/orders'
import { initDataSource } from '../db/ordersService'
import log from '../utils/logger'
import { Repository } from 'typeorm'

const initOrderRowsRepository = async (): Promise<Repository<Order>> => {
  try {
    const ds = await initDataSource()
    if (!ds) {
      throw new Error('data source is undefined')
    }
    return ds.getRepository(Order)
  } catch (err) {
    log.error('repositories/orders', 'failed to initialize repository', err)
    throw err
  }
}

export default initOrderRowsRepository
