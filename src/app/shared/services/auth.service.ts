import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from './user';
import * as auth from 'firebase/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    public afs: AngularFirestore,
    // public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(result => {
        this.setUserData(result.user).then(() => {
          this.ngZone.run(() => {
            this.router.navigate([ 'home' ]);
          });
        });
      })
      .catch(error => {
        localStorage.removeItem('user');
        window.alert(error.message);
      });
  }

  signUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        this.sendVerificationEmail();
        this.setUserData(result.user);
      })
      .catch(error => {
        localStorage.removeItem('user');
        window.alert(error.message);
      });
  }

  sendVerificationEmail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate([ 'verify-email' ]);
      })
  }

  forgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('A jelszó visszaálltáshoz szükséges email elküldve!');
      }).catch(error => {
        window.alert(error);
      });
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false;
  }

  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider())
      .then((res: any) => {
        if (res) {
          this.router.navigate([ 'home' ]);
        }
      });
  }

  authLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then(result => {
        this.ngZone.run(() => {
          this.router.navigate([ 'home' ]);
        });
        this.setUserData(result.user);
      }).catch(error => {
        window.alert(error);
      });
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${ user.uid }`);
    // const userRef: AngularFireObject<any> = this.db.object(`users`);

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };

    // return userRef.set(userData);
    return userRef.set(userData, {
      merge: true
    });
  }

  signOut() {
    return this.afAuth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate([ 'login' ]);
      });
  }
}
