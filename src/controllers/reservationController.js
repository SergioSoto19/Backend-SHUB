import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getUserReservations = async (req, res) => {
    try {
        const reservations = await prisma.reservation.findMany();
        res.json(reservations);
    } catch (error) {
        console.error('Error al obtener las reservas:', error);
        res.status(500).json({ message: 'Error al obtener las reservas' });
    }
};

const registerReservation = async (req, res) => {
    const { check_in_date, check_out_date, user_id, hotel_id } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { id: user_id } });
        const hotel = await prisma.hotel.findUnique({ where: { id: hotel_id } });

        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        if (!hotel) {
            return res.status(400).json({ message: 'Hotel no encontrado' });
        }

        const formattedCheckInDate = new Date(check_in_date);
        const formattedCheckOutDate = new Date(check_out_date);

        if (formattedCheckOutDate <= formattedCheckInDate) {
            return res.status(400).json({ message: 'La fecha de salida no puede ser antes que la de llegada' });
        }

        const newReservation = await prisma.reservation.create({
            data: { 
                check_in_date: formattedCheckInDate, 
                check_out_date: formattedCheckOutDate, 
                user_id, 
                hotel_id 
            }
        });
        res.status(200).json({ message: 'Reserva registrada con éxito', newReservation });
    } catch (error) {
        console.error('Error al registrar la reserva:', error);
        res.status(500).json({ message: 'Error al registrar la reserva' });
    }
};

const updateReservation = async (req, res) => {
    const { id } = req.params;
    const { check_in_date, check_out_date, user_id, hotel_id } = req.body;

    try {
        const formattedCheckInDate = new Date(check_in_date);
        const formattedCheckOutDate = new Date(check_out_date);

        const updatedReservation = await prisma.reservation.update({
            where: { id: parseInt(id) },
            data: { 
                check_in_date: formattedCheckInDate, 
                check_out_date: formattedCheckOutDate, 
                user_id, 
                hotel_id 
            }
        });
        res.status(200).json({ message: 'Reserva actualizada con éxito', updatedReservation });
    } catch (error) {
        console.error('Error al actualizar la reserva:', error);
        res.status(500).json({ message: 'Error al actualizar la reserva' });
    }
};

const deleteReservation = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.reservation.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json({ message: 'Reserva cancelada con éxito' });
    } catch (error) {
        console.error('Error al cancelar la reserva:', error);
        res.status(500).json({ message: 'Error al cancelar la reserva' });
    }
};


export { getUserReservations, registerReservation, updateReservation, deleteReservation };


