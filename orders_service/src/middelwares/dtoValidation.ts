import { plainToInstance } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
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

export const pathOrderValidation = async (req: Request, _: Response, next: NextFunction) => {
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
