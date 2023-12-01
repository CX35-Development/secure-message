import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonContent } from '@ionic/angular'; 
import { EncryptionService } from '../encryption.service';
import { KeyMsgMgr } from '../key_MsgManager.service';
import Parse from 'parse';   
import { KeygenerationService } from '../keygeneration.service';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.page.html',
  styleUrls: ['./sender.page.scss'],
})
export class SenderPage implements OnInit {

  @ViewChild('content') content: any = IonContent;

  keyPair: any = {
    publicKey:'',
    privateKey:''
  }; 
  
  message: any;
  encryptedMessage: any;
  encryptedPrivateKey: any; 

  unencryptedMessage:any;

  senderPassword: any;
  
  recipientKey: any;

  decrypted: boolean = false;
  messageChanged: boolean = false;

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
      
      if(message.get('recipientMessage') !== this.keyMgr.messageFromRecipient){
        this.messageChanged = true;
        this.keyMgr.messageFromRecipient = message.get('recipientMessage');
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

  async getRecipientPublicKey(){
    const keys = await this.keyMgr.getRecipientKeys();
    if(!keys.publicKey){
      this.alert('No key to retrieve')
    } else {
      this.recipientKey = keys.publicKey;
    }
  }
  generateSenderKeys(){
    if(!this.senderPassword){
      this.alert('Please provide your password to encrypt the private key')
    } else {
      this.keyPair = this.key_Generation.generateKeyPair()
      this.encryptSenderPrivateKey();
    } 
  }   

  encryptSenderPrivateKey(){
    if(!this.senderPassword){
      this.alert('Please enter your password')
    } else 
    if(!this.keyPair.privateKey){
      this.alert('No key to encrypt')
    } else {
      this.encryptedPrivateKey = this.encrypt_Decrypt.encryptPrivateKey(this.keyPair.privateKey,this.senderPassword);   
      this.keyPair.privateKey = this.encryptedPrivateKey;
      this.keyMgr.saveSenderKeys(this.keyPair.privateKey, this.keyPair.publicKey) 
      this.decrypted = true;
      this.senderPassword = null;
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
          placeholder: 'Enter Your Password',
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
    const keys = await this.keyMgr.getSenderKeys(); 
    if(keys.privateKey){
      const decryptedKey = this.encrypt_Decrypt.decryptPrivateKey(keys.privateKey, password)
      if(decryptedKey === 'failed'){
        this.alert('No Private key to show');
      } else {
        this.decrypted = false;
        this.keyPair.privateKey = decryptedKey;
        this.keyPair.publicKey = keys.publicKey;
        this.senderPassword = null;
      }
    } else {
      this.alert('No Private Key to retrieve')
    }  
  }

  encryptMessage(){
    if(!this.message){
      this.alert('Please provide a message')
    } else {
      if(!this.recipientKey){
        this.alert('Please retrieve the recipients public key before continuing');
        this.content.scrollToTop(350)
      } else {
        this.encryptedMessage = this.encrypt_Decrypt.encryptMessage(this.recipientKey,this.message);
       
      } 
    }
   
  }

  decryptReceivedMessage(){
    if(!this.keyMgr.messageFromRecipient){
        this.alert('There is no message to decrypt')
      } else 
      if(!this.keyPair.privateKey){
        this.alert('Please recover your private key')
      } else {
        this.unencryptedMessage = this.encrypt_Decrypt.decryptMessage(this.keyPair.privateKey, this.senderPassword, this.keyMgr.messageFromRecipient);
        this.messageChanged = false; 
      } 
    }

  async sendMessage(){
    await this.keyMgr.saveSenderMessage(this.encryptedMessage);
    this.message = null;
    this.encryptedMessage = null;
    this.alert('Message Sent!'); 
      
  }


}
