import e from "express";
import jwt from "jsonwebtoken";

export default class JwtService {
     static generateToken(payload){
          return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "4h" });   
     }
     static verifyToken(token){
            try {
                return jwt.verify(token, process.env.JWT_SECRET);
            } catch (error) {
                return new error("Token inválido o expirado");
            }
     }
    }