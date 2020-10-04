import { User } from 'firebase';
import React, { useEffect, useState } from 'react';
import { FirebaseContextProp } from '../firebase';

export interface UserContextProp {
  authUser: User | null | undefined
}

const AuthUserContext = React.createContext({} as UserContextProp);

export const withAuthentication = (Component: React.FC<UserContextProp & any>) => ({firebase}: FirebaseContextProp) => {

  const [user, setUser] = useState<UserContextProp>();

  const handleAuthStateChanged = (authUser: User | null) => setUser({authUser});

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged(handleAuthStateChanged);
    return listener();
  }, [firebase.auth])

  return (
    <Component authUser={user?.authUser} firebase={firebase}/>
  );
}
export default AuthUserContext;