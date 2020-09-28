import { User } from 'firebase';
import React, { useEffect, useState } from 'react';
import { FirebaseContextProp } from '../firebase';

export interface ContextProp {
  authUser: User | null | undefined
}

const AuthUserContext = React.createContext({} as ContextProp);

export const withAuthentication = (Component: React.FC<ContextProp>) => ({firebase}: FirebaseContextProp) => {

  const [user, setUser] = useState<ContextProp>();

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged((authUser: User | null) => setUser({authUser}));
    return listener();
  })

  return (
    <Component authUser={user?.authUser}/>
  );
}
export default AuthUserContext;