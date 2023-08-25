import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import VisibilityIcon from '../assets/svg/visibilityIcon.svg';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { db } from '../firebase.config';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Oauth from '../components/Oauth';
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

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
      // firebase Authentication
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      // firebase fireStore
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, 'users', user.uid), formDataCopy);
      navigate('/');
    } catch (error) {
      if (name === '' && email === '' && password === '') {
        toast.error('Please fill in all required fields');
      } else if (name === '' || email === '' || password === '') {
        toast.error('Please fill in all required fields');
      } else {
        toast.error('Something went wrong with registration');
      }
    }
  };

  return (
    <>
      <div className="pageContainer mb-20">
        <header>
          <p className="pageHeader text-center mb-[0.5rem] ">Welcome Back!</p>
        </header>
        <form className="flex flex-col items-center gap-0 " onSubmit={onSubmit}>
          <input
            type="text"
            className="inputField nameSvg"
            placeholder="Name"
            id="name"
            value={name}
            onChange={onChange}
          />
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
          <div className="signUpBar">
            <p className="signText">Sign Up</p>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="22px"
                viewBox="0 0 24 24"
                width="22px"
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
        <Link to="/sign-in" className="registerLink mb-10">
          Sign In Instead
        </Link>
      </div>
    </>
  );
};

export default SignUp;
