import crypto from 'crypto'

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'abcdefghijklmnopqrstuvwxyz'
function encrypt(text: string) {
    const algorithm = 'aes-256-cbc';

    const cipher = crypto.createCipher(algorithm, ENCRYPTION_KEY);
    let encryptedText = cipher.update(text, 'utf8', 'hex');
    encryptedText += cipher.final('hex');

    return encryptedText;
}

function decrypt(encryptedText: string) {
    const algorithm = 'aes-256-cbc';

    const decipher = crypto.createDecipher(algorithm, ENCRYPTION_KEY);
    let decryptedText = decipher.update(encryptedText, 'hex', 'utf8');
    decryptedText += decipher.final('utf8');

    return decryptedText;
}

export { encrypt, decrypt }

