import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/authUtils.js';

const prisma = new PrismaClient();

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findFirst({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Correo incorrecto' });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = generateToken(user);

        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

export { loginUser };