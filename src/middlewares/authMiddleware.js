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
        const { userId, email, role } = jwt.verify(token, SECRET_KEY);
        req.user = { userId, email, role };

        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: "token invalido" });
    }
};

const verifyAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        return next();
    }

    return res.status(403).json({ error: "Usuario no autorizado" });
};

export { verifyToken, verifyAdmin };