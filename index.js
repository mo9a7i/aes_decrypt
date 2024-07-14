const crypto = require('crypto');

function decryptData(encryptedData, password) {
    try {
        // Decode Base64
        const encryptedBuffer = Buffer.from(encryptedData, 'base64');

        // Extract salt (first 16 bytes), IV (next 16 bytes), and ciphertext
        const salt = encryptedBuffer.slice(0, 16);
        const iv = encryptedBuffer.slice(16, 32);
        const ciphertext = encryptedBuffer.slice(32);

        // Derive key using PBKDF2 with the same parameters
        const key = crypto.pbkdf2Sync(password, salt, 100, 32, 'sha256');

        // Decrypt
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        let decrypted = decipher.update(ciphertext);
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        // Convert decrypted data to string
        return decrypted.toString('utf8');
    } catch (error) {
        console.error("Decryption failed:", error);
        throw error;
    }
}


// Usage example
(async () => {
    const encryptedData = 'k9dicAPwxSjzorXYU95tD3KYHk6X4GitiyaY5H9zQPEE+ZlPbfF7iOz3LtX95svLNaGAt2ohUrymP21yNEpdrgtYhUMyzJ2STMWM6gmVikCcIIkCyQTMHk2ns1YJWNNxiUeebH7j7PAsDqshB1Bl1yzm7guRr3wocn/duqQrcH0hriPJtLrSR7aaDfd26XqZ6iYuZjvJtCgVl8T5lq6l7pjbMmmHve/jZ0u4rJO+mx6W/S4KRf7YX70nrXAXS/EG';
    const password = 'y.a.s.a.s.i.i';
    try {
        const decryptedData = decryptData(encryptedData, password);
        console.log('Decrypted Data:', decryptedData);
    } catch (error) {
        console.error("Failed to decrypt:", error);
    }
})();
