import express from 'express';
import { Router, Request, Response } from 'express';
import router from './routes/encrypt_pass_route.js';

const app = express();
const PORT = 1000;

const route = Router();

app.use(express.json());

route.get('/', (req: Request, res: Response) => {
    res.json({Message: "Server Challenge 1"});
});

app.use(route);

//Rota configurada para criptografia das senhas:
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});




