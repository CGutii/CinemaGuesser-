import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginContainer = () => {
  const loginNameRef = useRef();
  const loginPasswordRef = useRef();

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const doLogin = async (event) => {
    event.preventDefault();

    const loginName = loginNameRef.current.value;
    const loginPassword = loginPasswordRef.current.value;

    var obj = { login: loginName, password: loginPassword };
    var js = JSON.stringify(obj);

    try {
      var bp = require('./Paths.js');
      const response = await fetch(bp.buildPath('api/login'), {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });
      var res = JSON.parse(await response.text());
      // const response = await fetch('api/login', {
      //   method: 'POST',
      //   body: js,
      //   headers: { 'Content-Type': 'application/json' },
      // });

      // const res = JSON.parse(await response.text());

      if (res.error !== '') {
        setMessage('User/Password combination incorrect');
      } else {
        const user = {
          firstName: res.firstName,
          lastName: res.lastName,
        };
        localStorage.setItem('user_data', JSON.stringify(user));

        setMessage('');
        navigate('/home');
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  return (
    <>
      <div className='flex justify-center mt-20'>
        <div className='flex justify-center items-start w-1/2'>
          <div className='flex flex-col flex-none basis-72 justify-center items-center rounded-md bg-slate-500 bg-opacity-10 backdrop-blur-sm'>
            <form className='mt-10'>
              <div className='relative'>
                <input
                  className='peer h-10  border-b-2 border-pr-yellow text-pr-white focus:outline-none bg-transparent placeholder-transparent'
                  id='username'
                  ref={loginNameRef}
                  type='text'
                  placeholder='a'
                ></input>
                <label
                  className='absolute left-0 -top-3.5 text-pr-yellow text-md transtion-all peer-placeholder-shown:text-base peer-placeholder-shown:text-pr-gray peer-placeholder-shown:top-2 peer-focus: -top-3.5  peer-focus: text-md '
                  htmlFor='username'
                >
                  Login
                </label>
              </div>
              <div className='relative mt-8'>
                <input
                  className='peer h-10 border-b-2 border-pr-yellow text-pr-white focus:outline-none bg-transparent placeholder-transparent'
                  id='password'
                  ref={loginPasswordRef}
                  type='password'
                  placeholder='a'
                ></input>
                <label
                  className='absolute left-0 -top-3.5 text-pr-yellow text-md transtion-all peer-placeholder-shown:text-base peer-placeholder-shown:text-pr-gray peer-placeholder-shown:top-2 peer-focus: -top-3.5  peer-focus: text-md '
                  htmlFor='password'
                >
                  Password
                </label>
                <button
                  className='transition-all ease-in-out delay-150 duration-300 hover:scale-110 block my-6 rounded-full bg-gradient-to-r from-pr-yellow to-pr-red  text-white w-52 h-10 font-medium hover:font-extrabold '
                  type='submit'
                  onClick={doLogin}
                >
                  Login
                </button>
              </div>
            </form>
            <div className='text-center'>
              <span className='text-pr-white pr-2'>Don't have an account?</span>
              <button
                className='text-pr-yellow font-medium hover:font-extrabold hover:underline'
                onClick={() => navigate('/register')}
              >
                Register
              </button>
              <a
                className='block text-pr-yellow text-center text-sm font-medium py-2 hover:font-extrabold hover:underline'
                href='/'
              >
                Forgot Password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginContainer;
