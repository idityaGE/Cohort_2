import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface DecodedToken {
  username: string;
}

export const auth = (req: Request, res: Response, next: NextFunction): Response | void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Token not found");

  }
  const jwtPass = process.env.JWT_SECRET as string;
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, jwtPass) as DecodedToken;
    req.body.username = decoded;
    next();
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
}