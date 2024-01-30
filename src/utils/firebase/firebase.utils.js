import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCHNcsfGlJP2GuiZxMr3OhXzGg8eSHqe2g",
  authDomain: "crown-clothing-db-b4eb5.firebaseapp.com",
  projectId: "crown-clothing-db-b4eb5",
  storageBucket: "crown-clothing-db-b4eb5.appspot.com",
  messagingSenderId: "514515819189",
  appId: "1:514515819189:web:e8c24364e01f7c5fbcfcfc"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt:'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
};