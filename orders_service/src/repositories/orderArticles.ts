import { initDataSource } from '../db/ordersService'
import log from '../utils/logger'
import { Repository } from 'typeorm'
import { OrderArticle } from '../models'

const initOrderArticlesRepository = async (): Promise<Repository<OrderArticle>> => {
  try {
    const ds = await initDataSource()
    if (!ds) {
      throw new Error('data source is undefined')
    }
    return ds.getRepository(OrderArticle)
  } catch (err) {
    log.error('repositories/orderRows', 'failed to initialize repository', err)
    throw err
  }
}

export default initOrderArticlesRepository
