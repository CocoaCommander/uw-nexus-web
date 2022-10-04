import { useState } from 'react';
import ForgotPasswordBody from '../components/ForgotPassword/ForgotPasswordBody';
import SentEmailModal from '../components/ForgotPassword/SentEmailModal';

const ForgotPassword = () => {
  const [currEmail, setCurrEmail] = useState('');
  const [isButtonClicked, setButtonClicked] = useState(false);


  return (
    <div>
      <ForgotPasswordBody currEmail={currEmail} emailCallback={setCurrEmail} buttonCallback={setButtonClicked} />
      <SentEmailModal isButtonClicked={isButtonClicked} buttonCallback={setButtonClicked} />
    </div>
  );
}

export default ForgotPassword;