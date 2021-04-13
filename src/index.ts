import express from 'express';
import IndexRoutes from './routes';
//const bodyParser = require('body-parser');

//initializations
const app = express();

// Configuring body parser middleware
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

//settings
app.set('port', 3006);

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//routes
app.get('/', (req, res) => res.send("APPLICATION"));
app.use('/api', IndexRoutes); //use funciona para objetos con mutltiples rutas

//statis files

//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});