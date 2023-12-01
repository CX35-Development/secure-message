import { Injectable } from '@angular/core';
import * as forge from 'node-forge';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }

  
  encryptMessage(publicKey: string, message: string): string {
    const publicKeyObj = forge.pki.publicKeyFromPem(publicKey);
    const encryptedMessage = publicKeyObj.encrypt(message, 'RSA-OAEP', {
      md: forge.md.sha256.create(),
    });
  
    return forge.util.encode64(encryptedMessage);
  }

  decryptMessage(encryptedPrivateKey: string, password: string, encryptedMessage: string): string {
    const decryptedPrivateKey = forge.pki.decryptRsaPrivateKey(encryptedPrivateKey, password);
    const privateKeyPem = forge.pki.privateKeyToPem(decryptedPrivateKey);
    const privateKeyObj = forge.pki.privateKeyFromPem(privateKeyPem);
    const decryptedMessage = privateKeyObj.decrypt(forge.util.decode64(encryptedMessage), 'RSA-OAEP', {
      md: forge.md.sha256.create(),
    });
  
    return decryptedMessage;
  }

  encryptPrivateKey(privateKeyPem: string, password: string): string {
    const privateKeyObj = forge.pki.privateKeyFromPem(privateKeyPem); 
    // Encrypt the private key with a password
    const encryptedPrivateKey = forge.pki.encryptRsaPrivateKey(privateKeyObj, password); 
    return encryptedPrivateKey;
  }

  decryptPrivateKey(encryptedPrivateKey: string, password: string): string {
    // Decrypt the private key with the password
    const decryptedPrivateKey = forge.pki.decryptRsaPrivateKey(encryptedPrivateKey, password);  
    if(!decryptedPrivateKey){
      return 'failed';
    } else {
      return forge.pki.privateKeyToPem(decryptedPrivateKey);
    }
  }




}


