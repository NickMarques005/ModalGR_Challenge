import { Router, Request, Response } from 'express';
import { handleEncryptPasswords } from '../encrypted_passwords/encrypt.js';

const router = Router();

const secret_key = "#modalGR#GPTW#top#maiorEmpresaTecnologia#baixadaSantista"

router.post('/encrypt', async (req: Request, res: Response) => {
    //Rota pata receber os dados vindos da solicitação e fazer a criptografia das senhas entregues:

    try {
        const { password1, password2, password3 } = req.body;

        if (!password1 || !password2 || !password3) {
            return res.status(400).json({ error: "Houve um erro! Por favor, forneça todas as 3 senhas." });
        }

        const pass_data = {
            password1: password1,
            password2: password2,
            password3: password3
        }

        const encrypted_pass_data = handleEncryptPasswords(pass_data, secret_key);

        if (!encrypted_pass_data) {
            res.status(400).json({ success: false, })
        }

        console.log(`Senhas criptografadas para o cofre: \nSenha1: ${encrypted_pass_data.encrypted_pass1}\nSenha2: ${encrypted_pass_data.encrypted_pass2}\nSenha 3: ${encrypted_pass_data.encrypted_pass3}`);

        res.status(200).json({
            success: true,
            data: encrypted_pass_data
        });
    }
    catch (err) {
        console.error("Houve um erro no servidor: ", err);
        return res.status(500).json({success: false, message: "Houve um erro no servidor ao criptografar senhas"});
    }
});

export default router;
