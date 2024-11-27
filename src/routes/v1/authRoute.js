import Router from 'express';
import { authController } from '~/controllers';

const router = Router();
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/send-otp', authController.sendOTP);

export const authRoute = router;
