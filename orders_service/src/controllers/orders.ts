import { NextFunction, Request, Response } from 'express'
import log from '../utils/logger'
import { initOrdersRepository } from '../repositories/'
import { RequestWithExtra } from '../types'
export const getAllOrders = async (_: Request, res: Response, next: NextFunction) => {
  try {
    log.info('controllers/orders/getAllOrders', 'getting all orders')
    const ordersRepository = await initOrdersRepository()
    const orders = await ordersRepository.find({ relations: { orderRows: {} } })
    return res.json({ data: [...orders] })
  } catch (err) {
    log.error('controllers/orders/getAllOrders', 'error when fetching orders', err)
    next(err)
  }
}

export const postNewOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { customerRef, status } = req.body
    log.info('controllers/orders/postNewOrder', 'creating new order with', { customerRef, status })
    const ordersRepository = await initOrdersRepository()
    const { raw } = await ordersRepository.insert({ customerRef, status })
    const order = await ordersRepository.findOneBy({ id: raw[0].id })
    if (!order) {
      return res.status(406).json({ data: { id: raw[0].id } })
    }
    return res.json({ data: { ...order } })
  } catch (err) {
    log.error('controllers/orders/postNewOrder', 'error when creating new order ', err)
    next(err)
  }
}

export const patchOrder = async (req: RequestWithExtra, res: Response, next: NextFunction) => {
  const dto = req.body as { empRef: number }
  const id = +req.params.id
  const user = req.user!
  if (user.role !== 'admin' || !dto.empRef) {
    dto.empRef = user.id
  }
  try {
    log.info('controllers/orders/patchOrder', 'patching order with', { dto, user, orderId: id })
    const ordersRepository = await initOrdersRepository()
    const order = await ordersRepository.findOneBy({ id })
    if (!order) {
      throw new Error('Invalid request - order not found')
    }
    order.updateDate()
    await ordersRepository.update({ id }, { ...dto })
    return res.json({ data: { ...order, ...dto } })
  } catch (err) {
    log.error('controllers/orders/patchOrder', 'error when patching order', err)
    next(err)
  }
}

export const deleteOrder = async (req: RequestWithExtra, res: Response, next: NextFunction) => {
  const id = +req.params.id
  const user = req.user!
  try {
    log.info('controllers/orders/deleteOrder', 'removing order:', { id, user })
    const ordersRepository = await initOrdersRepository()
    const order = await ordersRepository.findOneBy({ id })
    if (order?.empRef !== user.id && user.role !== 'admin') {
      throw new Error('Forbidden action')
    }
    await ordersRepository.delete({ id })
    return res.json({ data: { ...order } })
  } catch (err) {
    log.error('controllers/orders/deleteOrder', 'removing order failed with', err)
    next(err)
  }
}
