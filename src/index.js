import express from 'express';

import routeUsers from './routers/routeUser.js';
import routeLogin from './routers/routeLogin.js';


const app = express()

app.use(express.json());
app.use('/api', routeUsers);   
app.use('/api', routeLogin); 


app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});
