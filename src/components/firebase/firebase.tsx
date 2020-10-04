import app, { auth, database, firestore } from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  auth: auth.Auth;
  db: database.Database;
  store: firestore.Firestore;
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
    this.store = app.firestore();

    this.doSignOut = this.doSignOut.bind(this);
  }

  doCreateUserWithEmailAndPassword = (email: string, password: string): Promise<any> => this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email: string, password: string): Promise<any> => this.auth.signInWithEmailAndPassword(email, password);

  doSignOut() {
    if (this.auth) {
      this.auth.signOut()
    } else {
      console.log(this.auth);
    }
  }

  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate= (password: string) => this.auth?.currentUser?.updatePassword(password);

  user = (uid: string) => this.db.ref(`users/${uid}`);

  user2 = (uid: string) => this.store.collection(`users`);

  task = () => this.store.collection('tasks');
}

export default Firebase;