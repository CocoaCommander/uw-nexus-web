import { useState } from 'react';
import ForgotPasswordBody from '../components/ForgotPassword/ForgotPasswordBody';

const ChangePassword = () => {
    const [currPassOne, setCurrPassOne] = useState('');
    const [currPassTwo, setCurrPassTwo] = useState('');
    const [isButtonClicked, setButtonClicked] = useState(false); // do whatever you want with this variable!


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

    return <ForgotPasswordBody forgotPasswordDetails={forgotPasswordDetails} buttonCallback={setButtonClicked} />;
}

export default ChangePassword;