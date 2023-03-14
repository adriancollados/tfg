import React from "react";
import { encode } from 'base-64';
import CryptoJS from 'crypto-js';


export function encryptCardNumber(cardNumber, key) {
    const algorithm = 'aes-256-cbc'; // Algoritmo de cifrado AES-256-CBC
    const keyHash = CryptoJS.createHash('sha256').update(key, 'utf8').digest('base64').substr(0, 32); // Hash de la clave
    const iv = CryptoJS.randomBytes(16); // Vector de inicialización aleatorio
    const cipher = CryptoJS.createCipheriv(algorithm, keyHash, iv); // Cifrador AES
    let encrypted = cipher.update(cardNumber, 'utf8', 'base64'); // Cifra el número de tarjeta
    encrypted += cipher.final('base64'); // Finaliza el cifrado
    const encryptedCardNumber = `${iv.toString('hex')}:${encrypted}`; // Concatena el vector de inicialización y el número de tarjeta cifrado
    return encryptedCardNumber;
    }
    
    export function decryptCardNumber(card, key) {
        const algorithm = 'aes-256-cbc'; // Algoritmo de cifrado AES-256-CBC
        const keyHash = CryptoJS.createHash('sha256').update(key, 'utf8').digest('base64').substr(0, 32); // Hash de la clave
        const [ivHex, encrypted] = card.split(':'); // Separa el vector de inicialización y el número de tarjeta cifrado
        const iv = Buffer.from(ivHex, 'hex'); // Convierte el vector de inicialización a buffer
        const decipher = CryptoJS.createDecipheriv(algorithm, keyHash, iv); // Descifrador AES
        let decrypted = decipher.update(encrypted, 'base64', 'utf8'); // Descifra el número de tarjeta
        decrypted += decipher.final('utf8'); // Finaliza el descifrado
        return decrypted;
    }

// Función para codificar el correo electrónico y la contraseña en base64
export function encodePassword(object) {
    // Obtener el correo electrónico y la contraseña del objeto
    const email = object.email;
    const password = object.password;
    
    // Combinar el correo electrónico y la contraseña en una sola cadena
    const combined = email + ':' + password;
    
    // Codificar la cadena combinada en base64
    const encoded = encode(combined);
    console.log("Hemos obtenido en base64")
    // Devolver la cadena codificada
    return encoded;
}
      