import express from 'express';
import { Router } from 'express';
import router from './routes/loan_route.js';
import cors from 'cors';
const app = express();
const PORT = 1000;
const route = Router();
app.use(express.json());
app.use(cors());
route.get('/', (req, res) => {
    res.json({ Message: "Server Challenge 2" });
});
app.use(route);
//Rota para verificação dos colaboradores:
app.use('/api', router);
app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});
//# sourceMappingURL=index.js.map