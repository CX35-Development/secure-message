import { Injectable } from '@angular/core'; 
import Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class KeyMsgMgr { 

  messageFromSender: any;
  messageFromRecipient: any;
  
  senderPublicKey: any;
  senderPrivateKey: any;

  recipientPublicKey: any;
  recipientPrivateKey: any;

  constructor(  )  { } 

  async saveSenderKeys(privateKey:any, publicKey: any){ 
    let query = new Parse.Query('Keys');
    query.equalTo('objectId','qL5nAhFFS5');
    let keyServer = await query.first()
    .catch((err)=>{
      console.log(err);
    })
    const keys = {
      privateKey: privateKey,
      publicKey: publicKey
    }
      keyServer?.set('senderKeys',keys);
      keyServer?.save()
      .catch((err)=>{
        console.log(err)
      })
      //console.log(keys)

    this.senderPrivateKey = privateKey;
    this.senderPublicKey = publicKey; 
  }

  async saveRecipientKeys(privateKey:any, publicKey:any){ 
    let query = new Parse.Query('Keys');
    query.equalTo('objectId','qL5nAhFFS5');
    let keyServer = await query.first()
    .catch((err)=>{
      console.log(err);
    })

    const keys = {
      privateKey: privateKey,
      publicKey: publicKey
    }
      keyServer?.set('recipientKeys',keys);
      keyServer?.save()
      .catch((err)=>{
        console.log(err)
      })
      //console.log(keys)

    this.recipientPrivateKey = privateKey;
    this.recipientPublicKey = publicKey;
  }

  async saveSenderMessage(message:string ){  
    let query = new Parse.Query('Messages');
    query.equalTo('objectId', 'pu6YP6ILu5');
    let messageServer = await query.first()
    .catch((err)=>{
      console.log(err);
    })
      messageServer?.set('senderMessage', message);
      messageServer?.save()
      .catch((err)=>{
        console.log(err);
      }) 
  }  

  async saveRecipientMessage(message:string){  
   let query = new Parse.Query('Messages');
    query.equalTo('objectId', 'pu6YP6ILu5');
    let messageServer = await query.first()
    .catch((err)=>{
      console.log(err);
    })
      messageServer?.set('recipientMessage', message);
      messageServer?.save()
      .catch((err)=>{
        console.log(err);
      }) 
  }  

  async getSenderKeys(){
    let query = new Parse.Query('Keys');
    query.equalTo('objectId','qL5nAhFFS5');
    let keyServer = await query.first()
    
    const keys = keyServer?.get('senderKeys');
    //console.log(keys)
    return keys;
  }

  async getRecipientKeys(){
    let query = new Parse.Query('Keys');
    query.equalTo('objectId','qL5nAhFFS5');
    let keyServer = await query.first()
   
    const keys = keyServer?.get('recipientKeys'); 
    return keys;
  }
 
  
}
