import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JwtUserPayload, UserRole, RequestWithExtra } from '../types'
import log from '../utils/logger'
export const authorization = (req: RequestWithExtra, _: Response, next: NextFunction) => {
  const { authorization = null } = req.headers
  try {
    if (!authorization) {
      throw new Error('invalid token')
    }
    const token = authorization.replace('Bearer ', '')
    log.info('middlewares/auth/authorization', 'validating token', token)
    req.user = jwt.verify(token, process.env.JWT_SECRET ?? 'secret') as JwtUserPayload
    next()
  } catch (err) {
    log.error('middlewares/auth/authorization', 'error when validating jwt token', err)
    next(err)
  }
}

export const authorizeRole = (roles: UserRole[]) => (req: RequestWithExtra, _: Response, next: NextFunction) => {
  log.info('middlewares/auth/authorizeRole', 'matching user role for endpoint', {
    mandatoryRoles: roles,
    userRole: req.user?.role,
  })
  const role = req.user?.role
  try {
    if (!role || !roles.includes(role)) {
      throw new Error('invalid auth token')
    }
    next()
  } catch (err) {
    log.error('middlewares/auth/authorizeRole', 'error matching role for endpoint', err)
  }
}
