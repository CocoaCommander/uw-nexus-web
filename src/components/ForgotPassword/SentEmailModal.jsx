import './ForgotPassword.css';

const SentEmailModal = (props) => {
    const { isButtonClicked, buttonCallback } = props;

    const handleButtonClick = () => {
        document.getElementById('root').style.backdropFilter = 'brightness(100%)';
        buttonCallback(false);  
    }
    return isButtonClicked ?
        <aside className='sent-email-modal'>
            <h1 className='sent-email-header'>Sent!</h1>
            <p className='sent-email-body'>We sent you an email. Tap the link in that email to get back into your account.</p>
            <button className='sent-email-button' onClick={handleButtonClick}>GOT IT</button>
        </aside> :
        null;
}

export default SentEmailModal;