import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import Parse from 'parse';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    Parse.initialize(
      "tGpfeU5OWaxAGRDNOEMyEHTwJOg7cEuDkYYuorsD", 
      "94LEbnvFBTyL9UfyrHK6cenkZBBQUc7jef3jNM9m"
      );
    //javascriptKey is required only if you have it on server.
    
    Parse.serverURL = 'https://cs563.b4a.io/'
    // Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDibcBSC5CAGlehyRkYMt1JfMA5FE6axqQ",
  authDomain: "cs563-luissotto.firebaseapp.com",
  projectId: "cs563-luissotto",
  storageBucket: "cs563-luissotto.appspot.com",
  messagingSenderId: "17908398634",
  appId: "1:17908398634:web:bd0789a72d975128dda153"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


  }
}
