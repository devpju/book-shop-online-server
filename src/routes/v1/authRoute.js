import Router from 'express';
import { authController } from '~/controllers';

const router = Router();
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/send-otp', authController.sendOTP);
router.post('/verify-otp', authController.verifyOTP);

export const authRoute = router;
