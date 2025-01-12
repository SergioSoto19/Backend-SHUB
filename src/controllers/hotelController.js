import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getHotels = async (req, res) => {
    try{
        const hotels = await prisma.hotel.findMany();
        res.json(hotels);
    }catch(error){
        res.status(500).json({message: 'Error al obtener los hoteles'});
    }
}

const registerHotel = async (req, res) => {
    const {name, location} = req.body;

    try{
        const newHotel = await prisma.hotel.create({
            data: {
                name,
                location
            }
        });
        res.status(200).json({message: 'Hotel registrado con éxito'});
    }catch(error){
        res.status(500).json({message: 'Error al registrar el hotel'});
    }
}


const updateHotel = async (req, res) => {
    const { id } = req.params
    const { name, location } = req.body;
    try {
        const updatedHotel = await prisma.hotel.update({
            where: {
                id: parseInt(id)
            },

            data: {
                name,
                location
            }
        });
        res.status(200).json({ message: 'Hotel actualizado éxitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el hotel' });
    }
}

const deleteHotel = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.hotel.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json({ message: 'Hotel eliminado éxitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el hotel' });
    }
};

export { getHotels, registerHotel, updateHotel, deleteHotel};