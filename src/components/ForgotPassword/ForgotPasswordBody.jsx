import './ForgotPassword.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from "emailjs-com";

const ForgotPasswordBody = (props) => {
    const { forgotPasswordDetails, buttonCallback, handleError } = props;
    const {
        currEmail,
        setCurrEmail,
        currPassOne,
        setCurrPassOne,
        currPassTwo, // password confirmation
        setCurrPassTwo, // password confirmation
        header,
        body,
        bodyTwo, // for password confirmation
        formType,
        formLabel,
        inputPlaceholder,
        inputPlaceholderTwo, // for password confirmation
        errorMessage,
        buttonText,
        token
    } = forgotPasswordDetails;
    const isEmail = formType === 'email';
    const [error, setError] = useState("");

    const handleEmailClick = () => {
        if (currEmail.length === 0) {
            handleError('No users found');
        } else {
            handleError('');
            buttonCallback(true);
            sendEmail(); // sending password reset link to email should be here
        }
    };

    const handlePasswordClick = () => {
        if (currPassOne !== currPassTwo || currPassOne.length === 0) {
            handleError('Passwords do not match.');
        } else {
            handleError("");
            resetPassword();
        }
    };

    const verifyEmail = async() => {
        // verifies the email entered is an existing account
        // returns user nam


    }

    const resetPassword = async() => {
        const url = `/api/auth/resetPassword?token=${token}`;

        const body = {
            new_password: currPassOne
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };

        const response = await fetch(url, requestOptions);

        if (response.status == 400 || response.status == 500) {
            const res = await response.json();
            handleError(res.message);
        } else {
            buttonCallback(true);
        }


    }


    const sendEmail = async () => {

        const url = "/api/auth/resetPassword";

        const body = {
            email: currEmail
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };

        const response = await fetch(url, requestOptions);


        if (response.status != 500) {
            buttonCallback(true);
        }
    }

    return (
        <section className='forgot-password-container'>
            <h1>{header}</h1>
            <p>{body}</p>
            {bodyTwo ? <p className='forgot-password-body-two'>{bodyTwo}</p> : null}
            <form className='forgot-password-form'>
                <label className='forgot-password-email-label' htmlFor={formType}>
                    {formLabel}
                </label>
                {isEmail ?
                    <input className='forgot-password-input' type={formType} placeholder={inputPlaceholder} onChange={(event) => setCurrEmail(event.target.value)} /> :
                    <div className='change-password-input-container'>
                        <input className='forgot-password-input' type={formType} placeholder={inputPlaceholder} onChange={(event) => setCurrPassOne(event.target.value)} />
                        <input className='forgot-password-input' type={formType} placeholder={inputPlaceholderTwo} onChange={(event) => setCurrPassTwo(event.target.value)} />
                    </div>
                }
            </form>
            {errorMessage ? <p className='forgot-password-error'>{errorMessage}</p> : null}
            {buttonText === 'Continue' ?
                <Link className='forgot-password-button' to='/login'>{buttonText}</Link> :
                <button className='forgot-password-button' onClick={isEmail ? handleEmailClick : handlePasswordClick}>{buttonText}</button>
            }
            {isEmail ? <footer className='forgot-password-footer'>&larr; Return to <Link className='login-redirect' to='/login'>Sign in screen</Link></footer> : null}
        </section>
    )
}

export default ForgotPasswordBody;