import express from 'express';
import {
  addTodoHandler,
  deleteTodoHandler,
  getAllTodoHandler,
  updateTodoHandler,
} from '../controller/todo.controller';
import { protect } from '../middleware/auth';
import validate from '../middleware/validate';
import {
  addTodoSchema,
  deleteTodoSchema,
  updateTodoSchema,
} from '../zod_schema/todo.schema';

const router = express.Router();

router.get('/', protect, getAllTodoHandler);
router.post('/', protect, validate(addTodoSchema), addTodoHandler);
router.put('/:todoid', protect, validate(updateTodoSchema), updateTodoHandler);
router.delete(
  '/:todoid',
  protect,
  validate(deleteTodoSchema),
  deleteTodoHandler
);

export default router;
