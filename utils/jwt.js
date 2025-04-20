// utils/jwt.js
import { SignJWT, jwtVerify } from 'jose';
import { configDotenv } from "dotenv";
configDotenv()

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const alg = 'HS256';

// Sign JWT Token
export const signToken = async (payload, expiresIn = '8h') => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(JWT_SECRET);
};

// Verify JWT Token
export const verifyToken = async (token) => {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (err) {
    console.error('JWT verification error:', err);
    throw new Error('Invalid token');
  }
};
