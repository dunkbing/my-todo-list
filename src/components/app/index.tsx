import { User } from 'firebase';
import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withFirebase, FirebaseContextProp } from '../firebase';
import Navigation from '../navigation';
import { AuthUserContext, AuthUserContextProp } from '../session';
import * as ROUTES from '../../constants/routes';
import SignUpPage from '../authentications/sign-up';
import SignInPage from '../authentications/sign-in';
import PasswordForgetPage from '../authentications/password-forget';
import AccountPage from '../authentications/account';
import AdminPage from '../authentications/admin';
import HomePage from '../home';
import LandingPage from '../landing';
import SideBar from '../side-bar';

const items = [
  { name: 'home', label: 'Home' },
  {
    name: 'billing',
    label: 'Billing',
    items: [
      { name: 'statements', label: 'Statements' },
      { name: 'reports', label: 'Reports' },
    ],
  },
  {
    name: 'settings',
    label: 'Settings',
    items: [
      { name: 'profile', label: 'Profile' },
      { name: 'insurance', label: 'Insurance' },
      {
        name: 'notifications',
        label: 'Notifications',
        items: [
          { name: 'email', label: 'Email' },
          {
            name: 'desktop',
            label: 'Desktop',
            items: [
              { name: 'schedule', label: 'Schedule' },
              { name: 'frequency', label: 'Frequency' },
            ],
          },
          { name: 'sms', label: 'SMS' },
        ],
      },
    ],
  },
]

const App: React.FC<FirebaseContextProp> = ({firebase}) => {

  const [user, setUser] = useState<AuthUserContextProp>({
    authUser: null,
  })

  useEffect(() => {
    firebase.auth.onAuthStateChanged((authUser: User | null) => setUser({authUser}));
  }, [firebase.auth]);

  return (
    <AuthUserContext.Provider value={user}>
      <Router>
        <Navigation/>
        {/* <SideBar items={items}/> */}
        <hr/>
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
      </Router>
    </AuthUserContext.Provider>
  );
}

export default withFirebase(App);