import { Router, Request, Response } from 'express';
import loanValuesConverter from '../loan_system/loan_converter.js';

const router = Router();

router.post('/checkCollaboratorData', async (req: Request, res: Response) => {
    //Rota pata receber os dados vindos da solicitação e fazer a criptografia das senhas entregues:

    try{
        const { name, hireDate, salary, loanAmount } = req.body;

        console.log(`DADOS: ${name}\n ${hireDate}\n ${salary}\n ${loanAmount}`);
        
        if (!name || !hireDate || !salary || !loanAmount) {
            return res.status(400).json({ success: false, message: "Preencha todos os campos obrigatórios." });
        }

        const minimalDate = new Date();
        minimalDate.setFullYear(minimalDate.getFullYear() - 5);

        console.log("Data minima: ", minimalDate);

        const hireFormattedDate = new Date(hireDate);
        
        if(loanAmount > (salary * 2) || hireFormattedDate > minimalDate)
        {
            return res.status(400).json({ success: false, message: "Você não atende aos requisitos mínimos do programa." });
        }

        if(loanAmount % 2 !== 0 || loanAmount == 0 || salary == 0)
        {
            return res.status(400).json({ success: false, message: "Insira um valor válido!"})
        }

        const loanAllTypes = loanValuesConverter(loanAmount);

        return res.status(200).json({ success: true, message: "Dados verificados com sucesso.", data: loanAllTypes });
    }
    catch (err)
    {
        console.error("Houve um erro ao verificar colaborador: ", err);
        return res.status(500).json({success: false, message: "Houve um erro no servidor ao verificar seus dados"});
    }
});

export default router;