import { useEffect, useState } from "react";
import { getRedirectResult } from 'firebase/auth';

import {
    auth,
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import '../sign-up-form/sign-up-form.styles.scss';

const defaultSignInFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    useEffect(() => {
        async function fetchData() {
            // You can await here
            const response = await getRedirectResult(auth);
            if (response) {
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
        }
        fetchData();
    }, []); // Or [] if effect doesn't need props or state


    const logGoogleUser = async () => {
        try {
            const { user } = await signInWithGooglePopup();
            const userDocRef = await createUserDocumentFromAuth(user);
        } catch (error) {
            console.log(error);
        }
    }

    const [formFields, setFormFields] = useState(defaultSignInFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultSignInFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);

            await console.log(user);
            resetFormFields();

        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    return(
        <div className='sign-in-container'>
            <h2>I already Have an Account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    type='email'
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}
                />
                <FormInput
                    label='Password'
                    type='password'
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}
                />
                <Button type='submit'>Sign In</Button>
                <Button buttonType='google' onClick={logGoogleUser}>Sign In with Google</Button>
            </form>
        </div>
    );
}

export default SignInForm;