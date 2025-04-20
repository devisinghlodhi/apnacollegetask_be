// utils/authMiddleware.js
import { verifyToken } from './jwt.js'; // Importing the verifyToken function from jwt.js

export const jwtMiddleware = async (req, res, next) => {
  // Extract the token from the Authorization header (Bearer token)
  const authHeader = req.headers.authorization;

  // If the token is not provided, return an error
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization token required' });
  }

  // Extract the token after the 'Bearer ' prefix
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  try {
    // Use the existing verifyToken function to validate the token
    const userPayload = await verifyToken(token);

    // Attach the decoded user payload to the request object
    req.user = userPayload;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
