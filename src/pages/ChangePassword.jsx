import { useState } from 'react';
import ForgotPasswordBody from '../components/ForgotPassword/ForgotPasswordBody';

const ChangePassword = () => {
    const [currPassOne, setCurrPassOne] = useState('');
    const [currPassTwo, setCurrPassTwo] = useState('');
    const [isButtonClicked, setButtonClicked] = useState(false);

    const forgotPasswordDetails = {
        currPassOne: currPassOne,
        setCurrPassOne: setCurrPassOne,
        currPassTwo: currPassTwo,
        setCurrPassTwo: setCurrPassTwo,
        header: 'Reset password',
        body: 'Enter your new password for nexus.uw@uw.edu',
        bodyTwo: 'A strong password has a combination of uppercase and lowercase letters, numbers, and/or symbols.',
        formType: 'password',
        formLabel: 'Enter your password here:',
        inputPlaceholder: 'New Password',
        inputPlaceholderTwo: 'Confirm Password',
        errorMessage: 'Passwords do not match.',
        buttonText: 'Save'
    };

    if (isButtonClicked) {
        forgotPasswordDetails.header = 'Password changed';
        forgotPasswordDetails.body = 'You have successfully reset your password.';
        forgotPasswordDetails.bodyTwo = 'Be sure to keep it in a safe space like a password manager!';
        forgotPasswordDetails.buttonText = 'Continue';
        document.getElementsByClassName('change-password-input-container')[0].style.display = 'none';
    }
    return <ForgotPasswordBody forgotPasswordDetails={forgotPasswordDetails} buttonCallback={setButtonClicked} />;
}

export default ChangePassword;