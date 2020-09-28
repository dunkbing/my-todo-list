import app, { auth } from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

export default class Firebase {
  auth: auth.Auth;
  constructor() {
    console.log(config)
    app.initializeApp(config);
    this.auth = app.auth();
    this.doSignOut = this.doSignOut.bind(this);
  }

  doCreateUserWithEmailAndPassword(email: string, password: string): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  doSignInWithEmailAndPassword(email: string, password: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  doSignOut() {
    if (this.auth) {
      this.auth.signOut()
    } else {
      console.log(this.auth);
    }
  }

  doPasswordReset(email: string) {
    this.auth.sendPasswordResetEmail(email);
  }

  doPasswordUpdate(password: string) {
    this.auth?.currentUser?.updatePassword(password)
  }
}
