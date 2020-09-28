import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import SignOutButton from '../authentications/sign-out';
import { AuthUserContext } from '../session';
import ul from '@material-ui/core/Menu';
import li from '@material-ui/core/MenuItem';

const NavigationAuth: React.FC = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <SignOutButton />
  </ul>
);

const NavigationNonAuth: React.FC = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </li>
  </ul>
);

const Navigation: React.FC = () => (
  <div>
    <AuthUserContext.Consumer>
      {({authUser}) => authUser ? <NavigationAuth/> : <NavigationNonAuth/>}
    </AuthUserContext.Consumer>
  </div>
);

export default Navigation;