import { Component, OnInit, ViewChild } from '@angular/core';
import { KeygenerationService } from '../keygeneration.service';
import { EncryptionService } from '../encryption.service';
import { KeyMsgMgr } from '../key_MsgManager.service';
import { AlertController, IonContent } from '@ionic/angular';
import Parse from 'parse'; 

@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.page.html',
  styleUrls: ['./recipient.page.scss'],
})
export class RecipientPage implements OnInit {
  @ViewChild('content') content: any = IonContent;
  
  keyPair: any = {
    publicKey:'',
    privateKey:''
  };
  
  message: any;
  encryptedMessage: any;
  encryptedPrivateKey: any;

  senderKey: any; 

  recipientPassword: any;
  recipientPrivateKey: any; 

  receivedMessage:any;
  unencryptedMessage: any;
  messageChanged:boolean = false;
  decrypted: boolean = false;

  constructor(
    private key_Generation: KeygenerationService,
    private encrypt_Decrypt: EncryptionService,
    public keyMgr: KeyMsgMgr,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.lookForMessages();
  }

  async lookForMessages(){
    let query = new Parse.Query('Messages');
    query.equalTo('objectId', 'pu6YP6ILu5');
    let messageServer = await query.subscribe()
     
    messageServer.on('update', (message)=>{ 
      if(message.get('senderMessage') !== this.keyMgr.messageFromSender){
        this.messageChanged = true;
        this.keyMgr.messageFromSender = message.get('senderMessage');
      } 
    })
  }

  async alert(message:string){
    const alert = await this.alertCtrl.create({
      message: message,
      buttons:['Ok']
    })
    await alert.present();
  }

  async getSenderPublicKey(){
    const keys = await this.keyMgr.getSenderKeys();
    if(!keys.publicKey){
      this.alert('No key to retrieve')
    } else {
      this.senderKey = keys.publicKey;
    }
  } 

  async decryptPrivateKey(){
    const alert = await this.alertCtrl.create({
      header: 'Please enter your password', 
      backdropDismiss: false,
      inputs: [
        {
          type: 'password',
          name: 'password',
          placeholder: '',
        }
      ],
      buttons: [
        {
          text:'Submit',
          role:'confirm', 
        },
        {
          text:'Cancel',
          role:'cancel', 
        }
    ]
    });

    await alert.present();
    const data = (await alert.onDidDismiss()).data
    if(data.values.password){
      this.retrieveKeys(data.values.password); 
    } else {
      return
    }
  }

  async retrieveKeys(password:any){ 
    const keys = await this.keyMgr.getRecipientKeys();
    
    if(keys.privateKey){
      const decryptedKey = this.encrypt_Decrypt.decryptPrivateKey(keys.privateKey, password)
      if(decryptedKey === 'failed'){
        this.alert('No Private key to show');
      } else {
        this.decrypted = false;
        this.keyPair.privateKey = decryptedKey;
        this.keyPair.publicKey = keys.publicKey;
        this.recipientPassword = null;
      }
    } else {
      this.alert('No Private Key to retrieve')
    }  
  }


  encryptMessage(){
    if(!this.message){ 
      this.alert('Please provide a message')
    } else {
      if(!this.senderKey){
        this.alert('Please retrieve the recipients public key before continuing');
        this.content.scrollToTop(350)
      } else {
        this.encryptedMessage = this.encrypt_Decrypt.encryptMessage(this.senderKey,this.message);
         
      } 
    }
   
  }
  
  async sendMessage(){
    await this.keyMgr.saveRecipientMessage(this.encryptedMessage);
    this.message = null;
    this.encryptedMessage = null;
    this.alert('Message Sent!')
  }




  async getRecipientPrivateKey(){ 
    const privateKey = await this.keyMgr.getSenderKeys()
    console.log(privateKey)
    if(!privateKey){
      this.alert('No Private key to show')
    }
  } 
  generateReceiverKeys(){
    if(!this.recipientPassword){
      this.alert('Please provide your password to encrypt the private key')
    } else {
      this.keyPair = this.key_Generation.generateKeyPair()
      this.encryptRecipientPrivateKey();
    } 
  }   

  

  encryptRecipientPrivateKey(){
    if(!this.recipientPassword){
      this.alert('Please enter your password')
    } else 
    if(!this.keyPair.privateKey){
      this.alert('No key to encrypt')
    } else {
      this.encryptedPrivateKey = this.encrypt_Decrypt.encryptPrivateKey(this.keyPair.privateKey,this.recipientPassword);   
      this.keyPair.privateKey = this.encryptedPrivateKey;
      this.keyMgr.saveRecipientKeys(this.keyPair.privateKey, this.keyPair.publicKey) 
      this.decrypted = true;
      this.recipientPassword = null;
    } 
  } 

  decryptReceivedMessage(){
  if(!this.keyMgr.messageFromSender){
      this.alert('There is no message to decrypt')
    } else 
    if(!this.keyPair.privateKey){
      this.alert('Please recover your private key')
    } else {
      this.unencryptedMessage = this.encrypt_Decrypt.decryptMessage(this.keyPair.privateKey, this.recipientPassword, this.keyMgr.messageFromSender);
      this.messageChanged = false; 
    }
  }


}
