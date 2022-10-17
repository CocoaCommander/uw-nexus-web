import './ForgotPassword.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from "emailjs-com";

const ForgotPasswordBody = (props) => {
    const { forgotPasswordDetails, buttonCallback } = props;
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
        buttonText
    } = forgotPasswordDetails;
    const isEmail = formType === 'email';
    const [error, setError] = useState(false);

    const handleEmailClick = () => {
        if (currEmail.length === 0) {
            setError(true);
        } else {
            setError(false);
            buttonCallback(true);
            sendEmail(); // sending password reset link to email should be here
        }
    };

    const handlePasswordClick = () => {
        if (currPassOne !== currPassTwo || currPassOne.length === 0) {
            setError(true);
        } else {
            setError(false);
            buttonCallback(true);
        }
    };

    const verifyEmail = () => {
        // verifies the email entered is an existing account
        // returns user name
    }

    const getResetLink = () => {
        // returns link to password change page
    }


    const sendEmail = async () => {

        const email_params = {
            to_name: "Person X",
            to_email: currEmail,
            message: "<linktoreset>"
        }

        const response = await emailjs.send("application_request", "account_pass_reset", email_params, `${process.env.REACT_APP_EMAIL_JS_API_KEY}`);
        if (response.status == 200) {
            buttonCallback(true);
        } else {
            console.log("error sending email");
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
            {error ? <p className='forgot-password-error'>{errorMessage}</p> : null}
            {buttonText === 'Continue' ?
                <Link className='forgot-password-button' to='/login'>{buttonText}</Link> :
                <button className='forgot-password-button' onClick={isEmail ? handleEmailClick : handlePasswordClick}>{buttonText}</button>
            }
            {isEmail ? <footer className='forgot-password-footer'>&larr; Return to <Link className='login-redirect' to='/login'>Sign in screen</Link></footer> : null}
        </section>
    )
}

export default ForgotPasswordBody;