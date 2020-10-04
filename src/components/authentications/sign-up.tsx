import React, { FormEvent, ChangeEvent, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { FirebaseContextProp, withFirebase } from '../firebase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { SignUpAccount } from './auth.model';

const SignUpPage: React.FC = () => (
  <div>
    <h1>Sign up</h1>
    <SignUpForm />
  </div>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

function SignUpFormBase({firebase, history}: FirebaseContextProp){
  const [account, setAccount] = useState<SignUpAccount>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: {
      message: null,
    },
  });

  const {
    username,
    email,
    password,
    confirmPassword,
    error,
  } = account;

  const isInvalid =
    password !== confirmPassword ||
    password === '' ||
    email === '' ||
    username === '';

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = account;
    firebase.doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => firebase.user2(authUser.user.uid).add({username, email}))
      .then(() => {
        setAccount({...account});
        if (history) history.push(ROUTES.HOME);
      })
      .catch(error => console.log(error));
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAccount({
      ...account,
      [event.target.name]: event.target.value
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <TextField
        name="username"
        value={username}
        onChange={onChange}
        type="text"
        variant="outlined"
        label="username"
      />
      <TextField
        name="email"
        value={email}
        onChange={onChange}
        type="text"
        variant="outlined"
        label="Email Address"
      />
      <TextField
        name="password"
        value={password}
        onChange={onChange}
        type="password"
        variant="outlined"
        label="Password"
      />
      <TextField
        name="confirmPassword"
        value={confirmPassword}
        onChange={onChange}
        type="password"
        placeholder="Confirm Password"
        variant="outlined"
        label="Confirm Password"
      />
      <Button variant="contained" color="primary" type="submit" disabled={isInvalid}>Sign Up</Button>
      {error?.message && <p>{error.message}</p>}
    </form>
  );
}

const SignUpLink: React.FC = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

export default SignUpPage;
export { SignUpForm, SignUpLink };