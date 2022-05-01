import { NextFunction, Response } from 'express'
import { RequestWithExtra } from 'src/types'
import log from '../utils/logger'
import { initOrderRowsRepository, initOrdersRepository } from '../repositories'
import { PostOrderRowDto, PatchOrderRowDto, DeleteOrderRowDto } from '../models/dtos/orderRows'
import { OrderRow } from 'src/models'

type OrderRowWithOrderId = PostOrderRowDto & { orderId: number }

export const postOrderRows = async (req: RequestWithExtra, res: Response, next: NextFunction) => {
  const user = req.user
  const orderId = +req.params.id
  const rows: OrderRowWithOrderId[] = req.body.map((row: PostOrderRowDto) => ({
    ...row,
    orderId,
  })) as OrderRowWithOrderId[]
  try {
    log.info('controllers/orderRows/postOrderRows', 'posting new order rows', { rows, user, orderId })
    const orderRowsRepository = await initOrderRowsRepository()
    const ordersRepository = await initOrdersRepository()
    const order = await ordersRepository.findOneBy({ id: orderId })
    if (!order) {
      throw new Error('bad request - no order')
    }
    if (user?.role !== 'admin' && order.id !== user?.id) {
      throw new Error('bad request - Unauthorized action')
    }
    const rowResult = await orderRowsRepository.save(rows, { transaction: true })
    return res.json({ data: [...rowResult] })
  } catch (err) {
    log.error('controllers/orderRows/postOrderRows', 'posting new order rows failed', err)
    next(err)
  }
}
export const patchOrderRows = async (req: RequestWithExtra, res: Response, next: NextFunction) => {
  const user = req.user
  const orderId = +req.params.id
  const rows: PatchOrderRowDto[] = req.body
  log.info('controllers/orderRows/patchOrderRows', 'patching order rows', { rows, user, orderId })
  try {
    if (rows.some((row) => row.orderId !== orderId)) {
      throw new Error('conflict-id for order and order rows are not the same')
    }

    const orderRowsRepository = await initOrderRowsRepository()
    const ordersRepository = await initOrdersRepository()

    const order = await ordersRepository.findOneBy({ id: orderId })
    if (!order) {
      throw new Error('forbidden- order does not exists')
    }
    if (order.empRef !== user?.id && user?.role !== 'admin') {
      throw new Error('forbidden- this order does not belong to you')
    }
    const updateValues = await orderRowsRepository.save([...rows], { transaction: true })
    res.json({ data: [...updateValues] })
  } catch (err) {
    log.error('controllers/orderRows/patchOrderRows', 'patching order rows failed', err)
    next(err)
  }
}

export const deleteOrderRows = async (req: RequestWithExtra, res: Response, next: NextFunction) => {
  const user = req.user
  const orderId = +req.params.id
  const rows: DeleteOrderRowDto[] = req.body

  log.info('controllers/orderRows/deleteOrderRow', 'deleting order rows', { rows, user, orderId })

  try {
    if (rows.some((row) => row.orderId !== orderId)) {
      throw new Error('conflict-id for order and order rows are not the same')
    }
    const orderRowsRepository = await initOrderRowsRepository()
    const ordersRepository = await initOrdersRepository()

    const order = await ordersRepository.findOneBy({ id: orderId })
    if (!order) {
      throw new Error('forbidden- order does not exists')
    }
    if (order.empRef !== user?.id && user?.role !== 'admin') {
      throw new Error('forbidden- this order does not belong to you')
    }
    const orderRows = await orderRowsRepository.find({ transaction: true, select: {}, where: [...rows] })
    const deleteResult = await orderRowsRepository.remove(orderRows, { transaction: true })
    res.json({ data: [...deleteResult] })
  } catch (err) {
    log.error('controllers/orderRows/deleteOrderRow', 'deleting order rows failed', err)
    next(err)
  }
}
