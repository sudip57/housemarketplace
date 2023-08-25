import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import VisibilityIcon from '../assets/svg/visibilityIcon.svg';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import Oauth from '../components/Oauth';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredintial = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredintial.user) {
        navigate('/');
      }
    } catch (error) {
      if (name === '' && email === '' && password === '') {
        toast.error('Please fill in all required fields');
      } else if (name === '' || email === '' || password === '') {
        toast.error('Please fill in all required fields');
      } else {
        toast.error('Invalid email or password');
      }
    }
  };

  return (
    <>
      <div className="pageContainer mb-5">
        <header>
          <p className="pageHeader text-center mb-[1rem] ">Welcome Back!</p>
        </header>
        <form className="flex flex-col items-center" onSubmit={onSubmit}>
          <input
            type="email"
            className="inputField emailSvg"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="inputField passwordSvg "
              placeholder="Password"
              id="password"
              value={password}
              onChange={onChange}
            />
            <img
              src={VisibilityIcon}
              alt="Show Paaword"
              className="showPassword"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>
          <Link to="/forgot-password" className="forgotPasswordLink">
            Forgot Password
          </Link>
          <div className="signBar">
            <p className="signText">Sign In</p>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#ffffff"
                className="signButton"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            </button>
          </div>
        </form>
        <Oauth />
        <Link to="/sign-up" className="registerLink ">
          Sign Up Instead
        </Link>
      </div>
    </>
  );
};

export default SignIn;
