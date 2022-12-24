import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterContainer() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const loginNameRef = useRef();
  const loginPasswordRef = useRef();
  const emailRef = useRef();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const doRegister = async (event) => {
    event.preventDefault();

    const loginName = loginNameRef.current.value;
    const loginPassword = loginPasswordRef.current.value;
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;

    let obj = {
      FirstName: firstName,
      LastName: lastName,
      Login: loginName,
      Password: loginPassword,
    };
    let js = JSON.stringify(obj);

    try {
      let bp = require('./Paths.js');
      const response = await fetch(bp.buildPath('api/register'), {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });
      let res = JSON.parse(await response.text());
      //   const response = await fetch('api/register', {
      //     method: 'POST',
      //     body: js,
      //     headers: { 'Content-Type': 'application/json' },
      //   });
      //     // const response = await fetch(buildPath('api/login’) {
      //     //     method: 'POST',
      //     //     body: js,
      //     //     headers: { 'Content-Type': 'application/json' },
      //     //   });

      //   const res = JSON.parse(await response.text());

      if (res.id <= 0) {
        setMessage('Username is taken, please try a different one');
      } else {
        // const user = {
        //   firstName: res.firstName,
        //   lastName: res.lastName,
        //   id: res.id,
        // };
        // localStorage.setItem('user_data', JSON.stringify(user));

        setMessage('');
        navigate('/home');
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  const handleFocus = (e) => {
    const input = e.target;
    input.setAttribute('focused', 'true');
  };

  return (
    <div className='flex justify-center m-20'>
      <div className='flex justify-center items-start w-1/2'>
        <div className='flex flex-col basis-1/2 justify-center items-center rounded-md bg-slate-500 bg-opacity-10 backdrop-blur-sm mb-8'>
          <form className='relative m-10' onSubmit={doRegister}>
            <div className='flex flex-col w-full'>
              <div className='relative w-full'>
                <input
                  className='peer h-10  border-b-2 border-pr-yellow text-pr-white focus:outline-none bg-transparent placeholder-transparent mr-4'
                  id='firstname'
                  ref={firstNameRef}
                  type='text'
                  placeholder='a'
                  onBlur={handleFocus}
                  focused='false'
                  required
                ></input>
                <span className='text-pr-yellow text-xs peer-valid:hidden'>
                  Empty Field!
                </span>
                <label
                  className='absolute left-0 -top-3.5 text-pr-yellow text-md transtion-all peer-placeholder-shown:text-base peer-placeholder-shown:text-pr-gray peer-placeholder-shown:top-2 peer-focus: -top-3.5  peer-focus: text-md '
                  htmlFor='firstname'
                >
                  First Name
                </label>
              </div>
              <div className='relative mt-10 w-full'>
                <input
                  className='peer h-10 border-b-2 border-pr-yellow text-pr-white focus:outline-none bg-transparent placeholder-transparent'
                  id='lastname'
                  ref={lastNameRef}
                  type='text'
                  placeholder='a'
                  onBlur={handleFocus}
                  focused='false'
                  required
                ></input>
                <span className='text-pr-yellow text-xs peer-valid:hidden'>
                  Empty Field!
                </span>
                <label
                  className='absolute left-0 -top-3.5 text-pr-yellow text-md transtion-all peer-placeholder-shown:text-base peer-placeholder-shown:text-pr-gray peer-placeholder-shown:top-2 peer-focus: -top-3.5  peer-focus: text-md '
                  htmlFor='lastname'
                >
                  Last Name
                </label>
              </div>
              <div className='relative w-full mt-10'>
                <input
                  className='peer h-10 border-b-2 border-pr-yellow text-pr-white focus:outline-none bg-transparent placeholder-transparent'
                  id='username'
                  ref={loginNameRef}
                  type='text'
                  placeholder='a'
                  onBlur={handleFocus}
                  focused='false'
                  required
                ></input>
                <span className='text-pr-yellow text-xs peer-valid:hidden'>
                  Empty Field!
                </span>
                <label
                  className='absolute left-0 -top-3.5  text-pr-yellow text-md transtion-all peer-placeholder-shown:text-base peer-placeholder-shown:text-pr-gray peer-placeholder-shown:top-2 peer-focus: -top-3.5  peer-focus: text-md '
                  htmlFor='username'
                >
                  Login
                </label>
              </div>
              <div className='relative w-full mt-10'>
                <input
                  className='peer h-10 border-b-2 border-pr-yellow text-pr-white focus:outline-none bg-transparent placeholder-transparent'
                  id='password'
                  ref={loginPasswordRef}
                  type='password'
                  placeholder='a'
                  pattern='^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$'
                  onBlur={handleFocus}
                  focused='false'
                  required
                ></input>
                <span className='text-pr-yellow text-xs w-52 peer-valid:hidden'>
                  Must be 8-20 characters and contain 1 letter, 1 number, 1
                  special character!
                </span>
                <label
                  className='absolute left-0 -top-3.5  text-pr-yellow text-md transtion-all peer-placeholder-shown:text-base peer-placeholder-shown:text-pr-gray peer-placeholder-shown:top-2 peer-focus: -top-3.5  peer-focus: text-md '
                  htmlFor='password'
                >
                  Password
                </label>
              </div>
              <div className='relative w-full mt-10'>
                <input
                  className='peer h-10 border-b-2 border-pr-yellow text-pr-white focus:outline-none bg-transparent placeholder-transparent'
                  id='email'
                  ref={emailRef}
                  type='email'
                  placeholder='a'
                  pattern='^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
                  onBlur={handleFocus}
                  focused='false'
                  required
                ></input>
                <span className='text-pr-yellow text-xs peer-valid:hidden'>
                  Invalid Email!
                </span>
                <label
                  className='absolute left-0 -top-3.5  text-pr-yellow text-md transtion-all peer-placeholder-shown:text-base peer-placeholder-shown:text-pr-gray peer-placeholder-shown:top-2 peer-focus: -top-3.5  peer-focus: text-md '
                  htmlFor='email'
                >
                  Email
                </label>
              </div>
            </div>

            <div>
              <button
                className='transition-all ease-in-out delay-150 duration-300 hover:scale-110 block my-6 rounded-full bg-gradient-to-r from-pr-yellow to-pr-red  text-white w-52 h-10 font-medium hover:font-extrabold '
                type='submit'
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterContainer;
