import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassowrd = () => {
  const [email, setEmail] = useState('');

  const onChange = (e) => setEmail(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success('Email sent successfully');
    } catch (error) {
      toast.error('Could not send reset email');
    }
  };
  return (
    <div className="pageContainer ">
      <header>
        <p className="pageHeader mb-4 text-center">Forgot Password</p>
      </header>
      <main className="flex flex-col justify-center items-center">
        <form onSubmit={onSubmit} className="">
          <input
            type="text"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
            className="emailSvg inputField "
          />

          <Link className="forgotPasswordLink  flex flex-col" to="/sign-in">
            Sign In
          </Link>
          <div className="forgotPasswordBar">
            <div className="signText">Send Reset Link</div>
            <button className="signButton">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#ffffff"
                className=""
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ForgotPassowrd;
