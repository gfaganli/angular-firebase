import { firebaseConfig } from './../../../environments/firebase';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as firebase from 'firebase';


@Component({
  selector: 'app-firebase-phone',
  templateUrl: './firebase-phone.component.html',
  styleUrls: ['./firebase-phone.component.css']
})
export class FirebasePhoneComponent implements OnInit {

  loginForm: FormGroup;
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  show: boolean;
  confirmationResult: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    firebase.initializeApp(firebaseConfig);

    this.loginForm = this.fb.group({
      phone: ['', Validators.required],
      password: ['', Validators.required],
    });

  }


  login() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    firebase.auth().signInWithPhoneNumber(this.loginForm.get('phone').value, this.recaptchaVerifier)
      .then((confirmationResult) => {
        this.confirmationResult = confirmationResult;
        this.show = true;
      })
      .catch((error) => {
      });
  }

  confirmCode() {
    this.confirmationResult.confirm(this.loginForm.get('password').value).then((result) => {
      window.alert(`Successfull Login! Your UID: ${result.user.uid}`);
    }).catch((error) => {
    });

  }

}

