import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.KEY;

const verifyToken = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "falta Token" });
    }

    token = token.split(" ")[1];

    try {
        const { email, role } = jwt.verify(token, SECRET_KEY);
        req.email = email;
        req.role = role;

        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: "token incorrecto" });
    }
};


 const verifyAdmin = (req, res, next) => {
    if (req.role === 'admin') {
        return next();
    }

    return res.status(403).json({ error: "Usuario no autorizado" });
};

export {verifyToken, verifyAdmin};