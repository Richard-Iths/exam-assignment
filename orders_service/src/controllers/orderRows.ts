import { NextFunction, Response } from 'express'
import { RequestWithExtra } from 'src/types'
import logger from '../utils/logger'
import { initOrderRowsRepository, initOrdersRepository } from '../repositories'

const postOrderRows = async (req: RequestWithExtra, res: Response, next: NextFunction) => {
  const rows = req.body
  const user = req.user
  const id = +req.params.id
  try {
    const orderRowsRepository = await initOrderRowsRepository()
    const ordersRepository = await initOrdersRepository()
    const order = ordersRepository.findOneBy({ id })
    if (!order) {
      throw new Error('bad request - no order')
    }
    if (user?.role === 'admin') {
    }
  } catch (err) {
    next(err)
  }
}
