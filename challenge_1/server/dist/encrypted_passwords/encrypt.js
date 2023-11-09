import { createCipheriv, randomBytes } from 'node:crypto';
const { createHmac, createHash, } = await import('node:crypto');
export const handleEncryptPasswords = (passwords_data, secret_key) => {
    //Efetuação da criptografia para cada senha:
    //Tipos -> createHmac/algoritmo sha256 - password 1 // createHash/algoritmo sha512 - password 2 // createCipheriv/algoritmo aes-256-cbc:
    const { password1, password2, password3 } = passwords_data;
    //Método Hmac
    const encrypted_pass1 = createHmac('sha256', secret_key)
        .update(password1)
        .digest('hex');
    //Método Hash
    const encrypted_pass2 = createHash('sha512')
        .update(password2)
        .digest('hex');
    //Método Cipheriv
    const derivedKey = secret_key.slice(0, 32);
    const aux_iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-cbc', Buffer.from(derivedKey), aux_iv);
    let encrypted_pass3 = cipher.update(password3, 'utf-8', 'hex');
    encrypted_pass3 += cipher.final('hex');
    return {
        encrypted_pass1,
        encrypted_pass2,
        encrypted_pass3
    };
};
//# sourceMappingURL=encrypt.js.map