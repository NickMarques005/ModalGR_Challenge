import express from 'express';
import { Router } from 'express';
import { monthBirthdaysSystem } from './birthdays/month_birthdays.js';
const app = express();
const PORT = 1000;
const route = Router();
app.use(express.json());
route.get('/', (req, res) => {
    res.json({ Message: "Server Challenge 2" });
});
app.use(route);
app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});
monthBirthdaysSystem();
//# sourceMappingURL=index.js.map