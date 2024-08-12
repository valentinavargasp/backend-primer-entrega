import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import exphbs from 'express-handlebars';
import { productsRouter } from './routes/products.router.js';
import { cartsRouter } from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';


const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer);

//Middleware
app.use(express.json());
app.use(express.static('./src/public'));

//Configuracion de handlebars
app.engine('handlebars', exphbs.engine() );
app.set('view engine', 'handlebars');
app.set('views', '.src/views');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);


io.on('connection', (socket) => {
    console.log('Usuario conectado');
    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});
