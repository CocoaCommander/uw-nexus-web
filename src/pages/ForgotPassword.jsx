import { useState } from 'react';
import ForgotPasswordBody from '../components/ForgotPassword/ForgotPasswordBody';
import SentEmailModal from '../components/ForgotPassword/SentEmailModal';

const ForgotPassword = () => {
  const [currEmail, setCurrEmail] = useState('');
  const [isButtonClicked, setButtonClicked] = useState(false);

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