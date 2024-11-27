import Router from 'express';
import { authController } from '~/controllers';

const router = Router();
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/send-otp', authController.sendOTP);
router.post('/verify-otp', authController.verifyOTP);
router.post('/logout', authController.logout);
router.post('/refresh-token', authController.refreshToken);

export const authRoute = router;
