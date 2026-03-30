import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { registerSchema, loginSchema, changePasswordSchema } from '../dto/auth.dto';

const router = Router();

router.post('/register', validate(registerSchema), (req, res, next) => authController.register(req, res, next));
router.post('/login', validate(loginSchema), (req, res, next) => authController.login(req, res, next));
router.get('/me', authenticate, (req, res) => authController.getMe(req, res));
router.put('/profile', authenticate, (req, res, next) => authController.updateProfile(req, res, next));
router.put('/password', authenticate, validate(changePasswordSchema), (req, res, next) => authController.changePassword(req, res, next));

export default router;
