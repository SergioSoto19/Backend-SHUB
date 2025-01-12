import { PrismaClient } from '@prisma/client';
import { encryptPassword } from '../utils/authUtils.js';

const prisma = new PrismaClient();

const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};

const registerUser = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const existingUser = await prisma.user.findFirst({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'El correo ya está registrado' });
        } else {
            const passwordHash = await encryptPassword(password);

            const newUser = await prisma.user.create({
                data: {
                    email,
                    password: passwordHash, 
                    role
                }
            });
            res.status(200).json({ message: 'Usuario registrado con éxito' });
        }
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};


export { getUsers, registerUser };