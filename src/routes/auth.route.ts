import express from 'express';
import { loginHandler, registerHandler } from '../controller/auth.controller';
import validate from '../middleware/validate';
import { loginSchema, registerSchema } from '../zod_schema/auth.schema';

const router = express.Router();

router.post('/register', validate(registerSchema), registerHandler);
router.post('/login', validate(loginSchema), loginHandler);

export default router;
