import express from 'express';
import cors from 'cors';
import routeUsers from './routers/routeUser.js';
import routeLogin from './routers/routeLogin.js';
import routerHotel from './routers/routeHotel.js';
import routeReservations from './routers/routeReservations.js';

const app = express()
app.use(cors());

app.use(express.json());
app.use('/api', routeLogin);
app.use('/api', routeUsers);
app.use('/api', routerHotel);
app.use('/api', routeReservations);



app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});
