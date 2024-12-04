import Router from 'express';
import { authController } from '~/controllers';
import authMiddleware from '~/middlewares/auth';
import { ROLE } from '~/utils/constants';

const router = Router();
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/send-otp', authController.sendOTP);
router.post('/verify-otp', authController.verifyOTP);
router.post('/signout', authMiddleware(Object.values(ROLE)), authController.logout);
router.post('/refresh-token', authController.refreshToken);

export const authRoute = router;
/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Đăng ký tài khoản mới
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - phoneNumber
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Nguyễn Văn An
 *               email:
 *                 type: string
 *                 format: email
 *                 example: example@example.com
 *               phoneNumber:
 *                 type: string
 *                 example: 0123456789
 *               password:
 *                 type: string
 *                 format: password
 *                 example: AnhEm!231
 *     responses:
 *       201:
 *         description: Đăng ký tài khoản thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Đăng ký tài khoản thành công
 *                 data:
 *                   type: object
 *       400:
 *         description: Yêu cầu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Email hoặc số điện thoại đã được sử dụng
 */
