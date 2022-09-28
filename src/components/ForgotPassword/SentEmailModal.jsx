import './ForgotPassword.css';

const SentEmailModal = (props) => {
    const { isButtonClicked } = props;

    return isButtonClicked ?
        <aside className='forgot-password-modal'>
            Test test test test
        </aside> :
        null;
}

export default SentEmailModal;