import express from 'express'
import { getAllOrders, postNewOrder, patchOrder, deleteOrder } from '../controllers/orders'
import { postOrderRows, patchOrderRows, deleteOrderRows } from '../controllers/orderRows'
import {
  createOrderValidation,
  authorization,
  authorizeRole,
  patchOrderValidation,
  postOrderRowsValidation,
  patchOrderRowsValidation,
  deleteOrderRowsValidation,
} from '../middelwares'
const router = express.Router()

router.get('/', authorization, authorizeRole(['admin', 'employee']), getAllOrders)
router.post('/', createOrderValidation, authorization, authorizeRole(['admin', 'employee']), postNewOrder)
router.patch('/:id', patchOrderValidation, authorization, authorizeRole(['admin', 'employee']), patchOrder)
router.delete('/:id', authorization, authorizeRole(['admin', 'employee']), deleteOrder)
router.post('/:id/rows', postOrderRowsValidation, authorization, authorizeRole(['admin', 'employee']), postOrderRows)
router.patch('/:id/rows', patchOrderRowsValidation, authorization, authorizeRole(['admin', 'employee']), patchOrderRows)
router.delete(
  '/:id/rows',
  deleteOrderRowsValidation,
  authorization,
  authorizeRole(['admin', 'employee']),
  deleteOrderRows
)

export default router
