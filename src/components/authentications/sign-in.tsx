import React, { ChangeEvent, FormEvent, useState } from 'react';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { FirebaseContextProp, withFirebase } from '../firebase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const SignInPage: React.FC = () => (
  <div>
    <SignInForm />
  </div>
);

const SignInForm = withRouter(withFirebase(SignInFormBase));

function SignInFormBase({firebase, history}: FirebaseContextProp) {
  console.log(this)
  const [account, setAccount] = useState({
    username: '',
    email: '',
    password: '',
    error: null,
  });
  const {
    email,
    password,
    error,
  } = account;

  const isInvalid = password === '' || email === '';

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = account;
    firebase.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setAccount({...account});
        history.push(ROUTES.HOME);
      })
      .catch(error => {
        console.log(error);
        setAccount({ ...account, error: error });
      });
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAccount({
      ...account,
      [event.target.name]: event.target.value
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <TextField
        name="email"
        value={email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
        variant="outlined"
      />
      <TextField
        name="password"
        value={password}
        onChange={onChange}
        type="password"
        placeholder="Password"
        variant="outlined"
      />
      <Button variant="contained" color="primary" disabled={isInvalid} type="submit">
        Sign In
      </Button>

      {error && <p>{(error as any).message}</p>}
    </form>
  );
}

export default SignInPage;