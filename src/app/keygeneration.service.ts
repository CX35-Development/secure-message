import { Injectable } from '@angular/core';
import * as forge from 'node-forge';

@Injectable({
  providedIn: 'root'
})
export class KeygenerationService {

  constructor() { } 

  generateKeyPair(): { publicKey: string; privateKey: string } {
    const keypair = forge.pki.rsa.generateKeyPair({ bits: 2048, workers: -1 });
    const privateKeyPem = forge.pki.privateKeyToPem(keypair.privateKey);
    const publicKeyPem = forge.pki.publicKeyToPem(keypair.publicKey);
  
    return {
      publicKey: publicKeyPem,
      privateKey: privateKeyPem,
    };
  }
  
  


}
