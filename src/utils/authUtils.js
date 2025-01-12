import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';


dotenv.config();

const SECRET_KEY = process.env.KEY;

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

const generateToken = (user) => {
    return jwt.sign(
        { userId: user.id, email: user.email, role: user.role }, 
        SECRET_KEY,  
        { expiresIn: '1h' }  
    );
};

export  { encryptPassword, generateToken }; 