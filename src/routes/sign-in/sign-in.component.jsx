import { useEffect } from "react";
import { getRedirectResult } from 'firebase/auth';

import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect
} from '../../utils/firebase/firebase.utils'

const SignIn = () => {
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await getRedirectResult(auth);
      if(response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state


  const logGoogleUser = async () => {
    try {
      const { user }  = await signInWithGooglePopup();
      const userDocRef = await createUserDocumentFromAuth(user);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick= { logGoogleUser }>
        Sign in With Google Popup
      </button>
      <button onClick={signInWithGoogleRedirect}>
        Sign in With Google Redirect
      </button>
    </div>
  );
}

export default SignIn;