import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ForgotPasswordBody from '../components/ForgotPassword/ForgotPasswordBody';

const ChangePassword = () => {
    const [currPassOne, setCurrPassOne] = useState('');
    const [currPassTwo, setCurrPassTwo] = useState('');
    const [isButtonClicked, setButtonClicked] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const resetToken = searchParams.get("token");

    const [errorMsg, setErrorMsg] = useState("");

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
        errorMessage: errorMsg,
        buttonText: 'Save',
        token: resetToken,
    };

    const handleError = (errorMsg) => {
        setErrorMsg(errorMsg);
    }

    if (isButtonClicked) {
        forgotPasswordDetails.header = 'Password changed';
        forgotPasswordDetails.body = 'You have successfully reset your password.';
        forgotPasswordDetails.bodyTwo = 'Be sure to keep it in a safe space like a password manager!';
        forgotPasswordDetails.buttonText = 'Continue';
        document.getElementsByClassName('change-password-input-container')[0].style.display = 'none';
    }
    return <ForgotPasswordBody forgotPasswordDetails={forgotPasswordDetails} buttonCallback={setButtonClicked} handleError={handleError}/>;
}

export default ChangePassword;