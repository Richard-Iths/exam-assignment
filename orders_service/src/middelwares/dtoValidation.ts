import { plainToInstance } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { DeleteOrderRowDto, PatchOrderRowDto, PostOrderRowDto } from '../models/dtos/orderRows'
import { CreateOrderDto, PatchOrderDto } from '../models/dtos/orders'
import log from '../utils/logger'

export const createOrderValidation = async (req: Request, _: Response, next: NextFunction) => {
  try {
    const dtoData = plainToInstance(CreateOrderDto, req.body)
    log.info('middlewares/dtoValidation/createOrderValidation', 'create new order dto validation', dtoData)
    await validateOrReject(dtoData)
    req.body = { ...dtoData }
    next()
  } catch (err) {
    log.error('middlewares/dtoValidation/createOrderValidation', 'error when validating create order dto', err)
    next(err)
  }
}

export const patchOrderValidation = async (req: Request, _: Response, next: NextFunction) => {
  try {
    const dtoData = plainToInstance(PatchOrderDto, req.body)
    log.info('middlewares/dtoValidation/patchOrderValidation', 'patch order dto validation', dtoData)
    await validateOrReject(dtoData)
    req.body = { ...dtoData }
    next()
  } catch (err) {
    log.error('middlewares/dtoValidation/patchOrderValidation', 'error when validating patch order dto', err)
    next(err)
  }
}

export const postOrderRowsValidation = async (req: Request, _: Response, next: NextFunction) => {
  try {
    const dtoData: PostOrderRowDto[] = plainToInstance(PostOrderRowDto, req.body as PostOrderRowDto[])

    log.info('middlewares/dtoValidation/postOrderRowsValidation', 'post order dto validation', dtoData)
    for (const dto of dtoData) {
      await validateOrReject(dto)
    }
    req.body = [...dtoData]
    next()
  } catch (err) {
    log.error('middlewares/dtoValidation/postOrderRowsValidation', 'error when validating patch order dto', err)
    next(err)
  }
}
export const patchOrderRowsValidation = async (req: Request, _: Response, next: NextFunction) => {
  try {
    const dtoData: PatchOrderRowDto[] = plainToInstance(PatchOrderRowDto, req.body as PatchOrderRowDto[])

    log.info('middlewares/dtoValidation/patchOrderRowsValidation', 'patch order dto validation', dtoData)
    for (const dto of dtoData) {
      await validateOrReject(dto)
    }
    req.body = [...dtoData]
    next()
  } catch (err) {
    log.error('middlewares/dtoValidation/patchOrderRowsValidation', 'error when validating patch order dto', err)
    next(err)
  }
}
export const deleteOrderRowsValidation = async (req: Request, _: Response, next: NextFunction) => {
  try {
    const dtoData: DeleteOrderRowDto[] = plainToInstance(DeleteOrderRowDto, req.body as DeleteOrderRowDto[])

    log.info('middlewares/dtoValidation/deleteOrderRowsValidation', 'delete order dto validation', dtoData)
    for (const dto of dtoData) {
      await validateOrReject(dto)
    }
    req.body = [...dtoData]
    next()
  } catch (err) {
    log.error('middlewares/dtoValidation/deleteOrderRowsValidation', 'error when validating delete order dto', err)
    next(err)
  }
}
