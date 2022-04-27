import express from 'express'
import { getAllOrders, postNewOrder, patchOrder, deleteOrder } from '../controllers/orders'
import { createOrderValidation, authorization, authorizeRole, pathOrderValidation } from '../middelwares'
const router = express.Router()

router.get('/', authorization, authorizeRole(['admin', 'employee']), getAllOrders)
router.post('/', createOrderValidation, authorization, authorizeRole(['admin', 'employee']), postNewOrder)
router.patch('/:id', pathOrderValidation, authorization, authorizeRole(['admin', 'employee']), patchOrder)
router.delete('/:id', authorization, authorizeRole(['admin', 'employee']), deleteOrder)

export default router
