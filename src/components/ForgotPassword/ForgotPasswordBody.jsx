import './ForgotPassword.css';
import { Link } from 'react-router-dom';

const ForgotPasswordBody = (props) => {
    const { currEmail, emailCallback, buttonCallback } = props;

    console.log('Current typed in value: ' + currEmail);

    return (
        <section className='forgot-password-container'>
            <h1>Forgot your password?</h1>
            <p>Enter your registered email address to receive password reset instructions.</p>
            <form className='forgot-password-form'>
                <label className='forgot-password-email-label' htmlFor='email'>
                    Enter your email here:
                </label>
                <input className='forgot-password-input' type='text' placeholder='Email Address' onChange={(event) => emailCallback(event.target.value)}/>
            </form>
            <button className='forgot-password-button' onClick={() => buttonCallback(true)}>Send</button>
            <footer className='forgot-password-footer'>&larr; Return to <Link className='login-redirect' to='/login'>Sign in screen</Link></footer>
        </section>
    )
}

export default ForgotPasswordBody;