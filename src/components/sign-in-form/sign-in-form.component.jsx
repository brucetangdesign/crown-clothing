import { useState } from "react";

import {
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { SignInFormContainer } from './sign-in-form.styles';

const defaultSignInFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultSignInFormFields);
    const { email, password } = formFields;

    const signInWithGoogle = async () => {
        try {
            await signInWithGooglePopup();
        } catch (error) {
            console.log(error);
        }
    }

    const resetFormFields = () => {
        setFormFields(defaultSignInFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();

        } catch (error) {
            if(error.code === "auth/invalid-credential") {
                alert("Incorrect username or password");
            }
            console.log(error);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    return(
        <SignInFormContainer>
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
                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </SignInFormContainer>
    );
}

export default SignInForm;