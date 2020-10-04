import React from 'react';
import { withFirebase, FirebaseContextProp } from '../firebase';
import Button from '@material-ui/core/Button';

const SignOutButton: React.FC<FirebaseContextProp> = ({firebase}) => {
  return (
    <Button variant="contained" type="button" onClick={firebase.doSignOut}>
      Sign out
    </Button>
  )
};

export default withFirebase(SignOutButton);