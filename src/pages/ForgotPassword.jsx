import { useState } from 'react';
import ForgotPasswordBody from '../components/ForgotPassword/ForgotPasswordBody';
import SentEmailModal from '../components/ForgotPassword/SentEmailModal';

const ForgotPassword = () => {
  const [currEmail, setCurrEmail] = useState('');
  const [isButtonClicked, setButtonClicked] = useState(false);
  const rootDOM = document.getElementById('root');

  if (isButtonClicked) {
    document.getElementById('root').style.backdropFilter = 'brightness(40%)';
    document.getElementsByClassName('header-desktop')[0].style.filter = 'brightness(40%)';
  } else {
    document.getElementById('root').style.backdropFilter = 'brightness(100%)';
    document.getElementsByClassName('header-desktop')[0].style.filter = 'brightness(100%)';
  }

  const forgotPasswordDetails = {
    currEmail: currEmail,
    setCurrEmail: setCurrEmail,
    header: 'Forgot your password?',
    body: 'Enter your registered email address to receive password reset instructions.',
    formType: 'email',
    formLabel: 'Enter your email here:',
    inputPlaceholder: 'Email Address',
    errorMessage: 'No users found.',
    buttonText: 'Send'
  };

  return (
    <div>
      <ForgotPasswordBody forgotPasswordDetails={forgotPasswordDetails} buttonCallback={setButtonClicked} />
      <SentEmailModal isButtonClicked={isButtonClicked} buttonCallback={setButtonClicked} />
    </div>
  );
}

export default ForgotPassword;