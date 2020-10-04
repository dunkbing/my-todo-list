import React from 'react';
import Firebase from './firebase';

const FirebaseContext = React.createContext({} as Firebase);

export interface ContextProp {
  firebase: Firebase,
  history?: any,
}

export const withFirebase = (Component: React.FC<ContextProp & any>) => (props: any) => (
  <FirebaseContext.Consumer>
    {(firebase: Firebase) => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;
