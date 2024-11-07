import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthService } from '../services/auth.service';
import { config } from '../config';
import { authWithBearer, authWithCookie } from '../middleware/auth';

const router = Router();

// Register endpoint
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      res.status(400).json({ message: 'Username and password are required' });
      return;
    }

    const user = await AuthService.register(username, password);
    res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    next(error);
  }
});

// Login with Bearer Token
router.post('/login/token', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = await AuthService.validateUser(username, password);

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Login with Cookie
router.post('/login/cookie', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = await AuthService.validateUser(username, password);

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('jwt', token, config.COOKIE_OPTIONS);
    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Test protected routes
router.get('/protected/token', authWithBearer, (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ message: 'Protected route accessed with token', user: req.user });
  } catch (error) {
    next(error);
  }
});

router.get('/protected/cookie', authWithCookie, (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ message: 'Protected route accessed with cookie', user: req.user });
  } catch (error) {
    next(error);
  }
});

export default router;